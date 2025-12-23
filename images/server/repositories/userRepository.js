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

	/**
	 * Updates Pokemon selection count in rankings
	 * @param {string} pokemonName - Name of the Pokemon to update
	 * @returns {Promise<UpdateResult|InsertOneResult>} Promise resolving to MongoDB operation result
	 * @example
	 * await userRepository.updatePokemonRanking("pikachu");
	 */
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

	/**
	 * Retrieves the top 5 most selected Pokemon from rankings
	 * @returns {Promise<PokemonRanking[]>} Promise resolving to array of top 5 Pokemon rankings
	 * @example
	 * const top5 = await userRepository.getTop5Pokemon();
	 * // Returns: [{ pokemon: "pikachu", selectionCount: 15 }, ...]
	 */
	async getTop5Pokemon() {
		const collection = this.db.getCollection("pokemonrankings");
		return await collection.find().sort({ selectionCount: -1 }).limit(5).toArray();
	}

	/**
	 * Saves user questionnaire answers to the database
	 * @param {UserAnswers} answersData - User answers data object to save
	 * @returns {Promise<InsertOneResult>} Promise resolving to MongoDB insert result
	 * @example
	 * await userRepository.saveUserAnswers({
	 *   username: "John",
	 *   personality: "analytical",
	 *   answers: ["yes", "no", "yes"],
	 *   yesCount: 2,
	 *   noCount: 1
	 * });
	 */
	async saveUserAnswers(answersData) {
		const collection = this.db.getCollection("useranswers");
		return await collection.insertOne(answersData);
	}
}

/**
 * @typedef {Object} UserData
 * @property {string} name - User's name
 * @property {string[]} pokemonTeam - Array of Pokemon names in user's team
 * @property {string} personality - User's calculated personality type
 * @property {string} timer - Timer value from team selection
 * @property {number} clicks - Number of clicks made during team selection
 */

/**
 * @typedef {Object} TeamDetails
 * @property {string} user - Username associated with the team
 * @property {PokemonData[]} teamdetails - Detailed Pokemon data for the team
 */

/**
 * @typedef {Object} PersonalityAnalysis
 * @property {string} user - Username associated with the analysis
 * @property {string} personality - Calculated personality type
 * @property {Object.<string, number>} scores - All personality scores
 */

/**
 * @typedef {Object} PokemonRanking
 * @property {string} pokemon - Pokemon name
 * @property {number} selectionCount - Number of times this Pokemon was selected
 */

/**
 * @typedef {Object} UserAnswers
 * @property {string} username - User's name
 * @property {string} personality - User's personality type
 * @property {string[]} answers - Array of yes/no answers
 * @property {number} yesCount - Count of 'yes' answers
 * @property {number} noCount - Count of 'no' answers
 */

module.exports = UserRepository;