/**
 * Repository class for managing user data operations in MongoDB
 * Implements the Repository pattern for data access abstraction
 */
class UserRepository {
	/**
	 * Creates an instance of UserRepository
	 * @param {DatabaseService} databaseService - Database service instance
	 */
	constructor(databaseService) {
		/** @type {DatabaseService} Database service instance */
		this.db = databaseService;
	}

	/**
	 * Creates a new user in the database
	 * @param {UserData} userData - User data object to insert
	 * @returns {Promise<InsertOneResult>} Promise resolving to MongoDB insert result
	 * @example
	 * const result = await userRepository.create({ name: "John", pokemonTeam: [] });
	 */
	async create(userData) {
		const collection = this.db.getCollection("users");
		return await collection.insertOne(userData);
	}

	/**
	 * Finds a user by their name
	 * @param {string} name - The name of the user to find
	 * @returns {Promise<UserData|null>} Promise resolving to user object or null if not found
	 * @example
	 * const user = await userRepository.findByName("John");
	 */
	async findByName(name) {
		const collection = this.db.getCollection("users");
		return await collection.findOne({ name });
	}

	/**
	 * Retrieves all users from the database
	 * @returns {Promise<UserData[]>} Promise resolving to array of all users
	 * @example
	 * const users = await userRepository.findAll();
	 */
	async findAll() {
		const collection = this.db.getCollection("users");
		return await collection.find().toArray();
	}

	/**
	 * Updates a user's Pokemon team
	 * @param {string} name - The name of the user to update
	 * @param {string[]} team - Array of Pokemon names for the team
	 * @returns {Promise<UpdateResult>} Promise resolving to MongoDB update result
	 * @example
	 * await userRepository.updateTeam("John", ["pikachu", "charizard"]);
	 */
	async updateTeam(name, team) {
		const collection = this.db.getCollection("users");
		return await collection.updateOne({ name }, { $set: { pokemonTeam: team } });
	}

	/**
	 * Updates a user's timer value
	 * @param {string} name - The name of the user to update
	 * @param {string} timer - Timer value to set
	 * @returns {Promise<UpdateResult>} Promise resolving to MongoDB update result
	 * @example
	 * await userRepository.updateTimer("John", "02:30");
	 */
	async updateTimer(name, timer) {
		const collection = this.db.getCollection("users");
		return await collection.updateOne({ name }, { $set: { timer } });
	}

	/**
	 * Updates a user's click count
	 * @param {string} name - The name of the user to update
	 * @param {number} clicks - Number of clicks to set
	 * @returns {Promise<UpdateResult>} Promise resolving to MongoDB update result
	 * @example
	 * await userRepository.updateClicks("John", 25);
	 */
	async updateClicks(name, clicks) {
		const collection = this.db.getCollection("users");
		return await collection.updateOne({ name }, { $set: { clicks } });
	}

	/**
	 * Updates a user's personality type
	 * @param {string} name - The name of the user to update
	 * @param {string} personality - Personality type to set
	 * @returns {Promise<UpdateResult>} Promise resolving to MongoDB update result
	 * @example
	 * await userRepository.updatePersonality("John", "Aggressive");
	 */
	async updatePersonality(name, personality) {
		const collection = this.db.getCollection("users");
		return await collection.updateOne({ name }, { $set: { personality } });
	}

	/**
	 * Saves detailed team data for a user
	 * @param {TeamDetails} teamDetails - Team details object to save
	 * @returns {Promise<InsertOneResult>} Promise resolving to MongoDB insert result
	 * @example
	 * await userRepository.saveTeamDetails({ user: "John", teamdetails: [...] });
	 */
	async saveTeamDetails(teamDetails) {
		const collection = this.db.getCollection("userteamdata");
		return await collection.insertOne(teamDetails);
	}

	/**
	 * Saves personality analysis results for a user
	 * @param {PersonalityAnalysis} personalityData - Personality analysis data to save
	 * @returns {Promise<InsertOneResult>} Promise resolving to MongoDB insert result
	 * @example
	 * await userRepository.savePersonalityAnalysis({ user: "John", personality: "Aggressive", scores: {...} });
	 */
	async savePersonalityAnalysis(personalityData) {
		const collection = this.db.getCollection("personalityanalysis");
		return await collection.insertOne(personalityData);
	}

	async updatePokemonRanking(pokemonName) {
		const collection = this.db.getCollection("pokemonrankings");
		const existing = await collection.findOne({ pokemon: pokemonName });
		
		if (existing) {
			return await collection.updateOne(
				{ pokemon: pokemonName },
				{ $inc: { selectionCount: 1 } }
			);
		} else {
			return await collection.insertOne({
				pokemon: pokemonName,
				selectionCount: 1
			});
		}
	}
}

module.exports = UserRepository;