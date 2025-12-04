require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const uri = process.env.URI;
const client = new MongoClient(uri);
let db;

async function connectDB() {
	try {
		await client.connect();
		db = client.db("PokemonUsers");
		console.log("Connected to MongoDB");
		app.listen(3000, () => console.log("Server running on port 3000"));
	} catch (err) {
		console.error("Error connecting to MongoDB:", err);
	}
}

app.post("/registerName", async (req, res) => {
	console.log(req.body);
	if (!req.body.name) {
		return res.status(400).send({
			status: "Bad request",
			message: "Name field is required",
		});
	}
	try {
		const userCollection = db.collection("users");

		const existingUser = await userCollection.findOne({ name: req.body.name });
		if (existingUser) {
			return res.status(409).send({
				status: "Conflict",
				message: "Username already exists. Please choose another one.",
			});
		}
		const user = {
			name: req.body.name,
			pokemonTeam: [],
			personality: "",
		};
		await userCollection.insertOne(user);
		res.status(201).send({
			status: "Saved",
			message: "User has been saved!",
			content: { name: user.name },
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			error: "Something went wrong!",
			value: error,
		});
	}
});

app.get("/users", async (req, res) => {
	try {
		const users = await db.collection("users").find().toArray();
		res.json(users);
	} catch (err) {
		console.error("Fetch error:", err);
		res.status(500).json({ message: "Error fetching users" });
	}
});

app.put("/updateTeam", async (req, res) => {
	if (!req.body.name || !req.body.team) {
		return res.status(400).send({ message: "Name and team are required" });
	}

	try {
		const userCollection = db.collection("users");
		const teamDetailsCollection = db.collection("userteamdata");
		const personalityCollection = db.collection("personalityanalysis");
		const result = await userCollection.updateOne({ name: req.body.name }, { $set: { pokemonTeam: req.body.team } });
		if (result.matchedCount === 0) {
			return res.status(404).send({ message: "User not found" });
		}
		async function fetchPokemonData(name) {
			const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
			const data = await res.json();

			const PokemonRes = await fetch(data.species.url);
			const PokemonData = await PokemonRes.json();
			const descriptionFind = PokemonData.flavor_text_entries.find((e) => e.language.name === "en");
			const descriptionText = descriptionFind.flavor_text;

			return {
				name: name,
				types: data.types.map((t) => t.type.name),
				height: data.height,
				weight: data.weight,
				description: descriptionText,
				attack: data.stats.find((s) => s.stat.name === "attack").base_stat,
				defense: data.stats.find((s) => s.stat.name === "defense").base_stat,
				speed: data.stats.find((s) => s.stat.name === "speed").base_stat,
			};
		}

		const teamData = [];

		for (let pokemonName of req.body.team) {
			const pokemonData = await fetchPokemonData(pokemonName);
			teamData.push(pokemonData);
		}

		await teamDetailsCollection.insertOne({
			user: req.body.name,
			teamdetails: teamData,
		});
		res.status(200).send({
			message: "Team updated successfully!",
			team: teamData,
		});

		function calculatePersonality(team) {
			const scores = {
				Aggressive: 0,
				Calm: 0,
				Anxious: 0,
				Loyal: 0,
				Naive: 0,
				Timid: 0,
			};

			team.forEach((poke) => {
				//Aggresive checks
				if (poke.attack >= 70) {
					scores.Aggressive += 1;
				}
				if (poke.height >= 10) {
					scores.Aggressive += 1;
				}
				if (poke.types.includes("fire") || poke.types.includes("dragon") || poke.types.includes("electric")) scores.Aggressive += 1;
				if (poke.description) {
					const desc = poke.description.toLowerCase();
					if (desc.includes("intimidates") || desc.includes("angry") || desc.includes("strong") || desc.includes("charges")) {
						scores.Aggressive += 1;
					}
				}
				//Calm checks
				if (poke.types.includes("water") || poke.types.includes("psychic") || poke.types.includes("normal")) {
					scores.Calm += 1;
				}
				if (poke.height >= 12) scores.Calm += 1;
				if (poke.speed <= 50) scores.Calm += 1;
				if (poke.attack <= 60) scores.Calm += 1;
				if (poke.description) {
					const desc = poke.description.toLowerCase();
					if (
						desc.includes("gentle") ||
						desc.includes("calm") ||
						desc.includes("peaceful") ||
						desc.includes("serene") ||
						desc.includes("tranquil") ||
						desc.includes("protective")
					) {
						scores.Calm += 1;
					}
				}
				//Anxious checks

				if (poke.speed >= 80) scores.Anxious += 1;
				if (poke.types.includes("ghost") || poke.types.includes("bug") || poke.types.includes("ice")) scores.Anxious += 1;
				if (poke.attack <= 40) scores.Anxious += 1;
				if (poke.height <= 8) scores.Anxious += 1;
				if (poke.description) {
					const desc = poke.description.toLowerCase();
					if (
						desc.includes("timid") ||
						desc.includes("nervous") ||
						desc.includes("shy") ||
						desc.includes("jumps") ||
						desc.includes("cautious") ||
						desc.includes("fearful")
					) {
						scores.Anxious += 1;
					}
				}
			});
			const winner = Object.keys(scores).reduce((a, b) => {
				if (scores[a] > scores[b]) return a;
				else return b;
			});
			return {
				winner: winner,
				scores: scores,
			};
		}
		console.log(calculatePersonality(teamData));
		const results = calculatePersonality(teamData);

		await personalityCollection.insertOne({
			user: req.body.name,
			personality: results.winner,
			scores: results.scores,
		});

		await userCollection.updateOne({ name: req.body.name }, { $set: { personality: results.winner } });
	} catch (err) {
		console.error(err);
		res.status(500).send({ message: "Something went wrong" });
	}
});
connectDB();
