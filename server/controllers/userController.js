/**
 * Controller class for handling user-related HTTP requests
 * Implements dependency injection for services and repositories
 */
class UserController {
	/**
	 * Creates an instance of UserController
	 * @param {UserRepository} userRepository - Repository for user data operations
	 * @param {PokemonService} pokemonService - Service for Pokemon API operations
	 * @param {PersonalityService} personalityService - Service for personality analysis
	 */
	constructor(userRepository, pokemonService, personalityService) {
		/** @type {UserRepository} Repository for user data operations */
		this.userRepository = userRepository;
		/** @type {PokemonService} Service for Pokemon API operations */
		this.pokemonService = pokemonService;
		/** @type {PersonalityService} Service for personality analysis */
		this.personalityService = personalityService;
	}

	/**
	 * Handles user registration requests
	 * @param {Request} req - Express request object
	 * @param {Response} res - Express response object
	 * @returns {Promise<void>} Promise that resolves when response is sent
	 * @example
	 * POST /registerName
	 * Body: { "name": "John" }
	 */
	async registerUser(req, res) {
		if (!req.body.name) {
			return res.status(400).send({
				status: "Bad request",
				message: "Name field is required",
			});
		}

		try {
			const existingUser = await this.userRepository.findByName(req.body.name);
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
				timer: "",
				clicks: 0,
			};

			await this.userRepository.create(user);
			res.status(201).send({
				status: "Saved",
				message: "User has been saved!",
				content: { name: user.name },
			});
		} catch (error) {
			res.status(500).send({
				error: "Something went wrong!",
				value: error,
			});
		}
	}

	/**
	 * Handles requests to retrieve all users
	 * @param {Request} req - Express request object
	 * @param {Response} res - Express response object
	 * @returns {Promise<void>} Promise that resolves when response is sent
	 * @example
	 * GET /users
	 */
	async getAllUsers(req, res) {
		try {
			const users = await this.userRepository.findAll();
			res.json(users);
		} catch (err) {
			console.error("Fetch error:", err);
			res.status(500).json({ message: "Error fetching users" });
		}
	}

	/**
	 * Handles requests to retrieve all users' teams
	 * @param {Request} req - Express request object
	 * @param {Response} res - Express response object
	 * @returns {Promise<void>} Promise that resolves when response is sent
	 * @example
	 * GET /team
	 */
	async getAllTeams(req, res) {
		try {
			const users = await this.userRepository.findAll();
			const teams = users.map((user) => ({
				name: user.name,
				pokemonTeam: user.pokemonTeam || [],
			}));
			res.json(teams);
		} catch (err) {
			console.error("Fetch teams error:", err);
			res.status(500).json({ message: "Error fetching teams" });
		}
	}

	/**
	 * Handles requests to update a user's Pokemon team and related data
	 * @param {Request} req - Express request object
	 * @param {Response} res - Express response object
	 * @returns {Promise<void>} Promise that resolves when response is sent
	 * @example
	 * PUT /updateTeam
	 * Body: {
	 *   "name": "John",
	 *   "team": ["pikachu", "charizard"],
	 *   "timer": "02:30",
	 *   "clicks": 25
	 * }
	 */
	async updateTeam(req, res) {
		if (!req.body.name || !req.body.team) {
			return res.status(400).send({ message: "Name and team are required" });
		}

		try {
			const { name, team, timer, clicks } = req.body;

			const user = await this.userRepository.findByName(name);
			if (!user) {
				return res.status(404).send({ message: "User not found" });
			}

			await Promise.all([
				this.userRepository.updateTeam(name, team),
				this.userRepository.updateTimer(name, timer),
				this.userRepository.updateClicks(name, clicks),
			]);

			const teamData = await this.pokemonService.fetchTeamData(team);

			await this.userRepository.saveTeamDetails({
				user: name,
				teamdetails: teamData,
			});

			const personalityResults = this.personalityService.calculatePersonality(teamData);

			await Promise.all([
				this.userRepository.savePersonalityAnalysis({
					user: name,
					personality: personalityResults.winner,
					scores: personalityResults.scores,
				}),
				this.userRepository.updatePersonality(name, personalityResults.winner),
			]);

			res.status(200).send({
				message: "Team updated successfully!",
				team: teamData,
				personality: personalityResults.winner,
			});
		} catch (err) {
			console.error(err);
			res.status(500).send({ message: "Something went wrong" });
		}
	}

	/**
	 * Handles Pokemon ranking requests
	 * @param {Request} req - Express request object
	 * @param {Response} res - Express response object
	 * @returns {Promise<void>} Promise that resolves when response is sent
	 * @example
	 * POST /pokemonranking
	 * Body: { "pokemon": "pikachu" }
	 */
	async pokemonRanking(req, res) {
		try {
			const { pokemon } = req.body;
			if (!pokemon) {
				return res.status(400).send({ message: "Pokemon name is required" });
			}

			await this.userRepository.updatePokemonRanking(pokemon);

			const collection = this.userRepository.db.getCollection("pokemonrankings");
			const rankings = await collection.find().toArray();

			res.status(200).send({
				message: `Updated ranking for ${pokemon}`,
				currentRankings: rankings,
			});
		} catch (err) {
			console.error("Test ranking error:", err);
			res.status(500).send({ message: "Something went wrong" });
		}
	}

	async getTop5Pokemon(req, res) {
		try {
			const top5 = await this.userRepository.getTop5Pokemon();
			res.status(200).json(top5);
		} catch (err) {
			console.error("Get top 5 Pokemon error:", err);
			res.status(500).send({ message: "Something went wrong" });
		}
	}
}

module.exports = UserController;
