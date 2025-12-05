const { MongoClient } = require("mongodb");

/**
 * Service for managing MongoDB database connections and operations
 * Implements Singleton pattern to ensure single database connection
 */
class DatabaseService {
	/**
	 * Creates an instance of DatabaseService
	 */
	constructor() {
		/** @type {MongoClient|null} MongoDB client instance */
		this.client = null;
		/** @type {Db|null} MongoDB database instance */
		this.db = null;
	}

	/**
	 * Establishes connection to MongoDB database
	 * @param {string} uri - MongoDB connection URI
	 * @returns {Promise<void>} Promise that resolves when connection is established
	 * @throws {Error} When connection fails
	 * @example
	 * await databaseService.connect("mongodb://localhost:27017");
	 */
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

	/**
	 * Gets the database instance
	 * @returns {Db} MongoDB database instance
	 * @throws {Error} If database is not connected
	 * @example
	 * const db = databaseService.getDatabase();
	 */
	getDatabase() {
		if (!this.db) {
			throw new Error("Database not connected. Call connect() first.");
		}
		return this.db;
	}

	/**
	 * Gets a collection from the database
	 * @param {string} collectionName - Name of the collection to retrieve
	 * @returns {Collection} MongoDB collection instance
	 * @example
	 * const users = databaseService.getCollection("users");
	 */
	getCollection(collectionName) {
		return this.getDatabase().collection(collectionName);
	}

	/**
	 * Closes the database connection
	 * @returns {Promise<void>} Promise that resolves when connection is closed
	 * @example
	 * await databaseService.disconnect();
	 */
	async disconnect() {
		if (this.client) {
			await this.client.close();
		}
	}
}

module.exports = new DatabaseService();