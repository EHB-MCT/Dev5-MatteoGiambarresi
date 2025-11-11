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
connectDB();
