const { MongoClient } = require("mongodb");

class DatabaseService {
	constructor() {
		this.client = null;
		this.db = null;
	}

	async connect(uri) {
		try {
			this.client = new MongoClient(uri);
			await this.client.connect();
			this.db = this.client.db("PokemonUsers");
		} catch (error) {
			console.error("Error connecting to MongoDB:", error);
			throw error;
		}
	}

	getDatabase() {
		if (!this.db) {
			throw new Error("Database not connected. Call connect() first.");
		}
		return this.db;
	}

	getCollection(collectionName) {
		return this.getDatabase().collection(collectionName);
	}

	async disconnect() {
		if (this.client) {
			await this.client.close();
		}
	}
}

module.exports = new DatabaseService();