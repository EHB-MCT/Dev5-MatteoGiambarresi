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
		res.status(400).send({
			status: "Bad request",
			message: "Name field is required",
		});
		return;
	}
	try {
		await client.connect();
		const database = client.db("PokemonUsers").collection("users");
		const user = {
			name: req.body.name,
			pokemonTeam: [],
			personality: "",
		};
		await database.insertOne(user);
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
	} finally {
		await client.close();
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
connectDB();
