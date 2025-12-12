require("dotenv").config();
const express = require("express");
const cors = require("cors");

const DatabaseService = require("./services/database");
const UserRepository = require("./repositories/userRepository");
const PokemonService = require("./services/pokemonService");
const PersonalityService = require("./services/personalityService");
const UserController = require("./controllers/userController");
const createUserRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());

async function initializeApp() {
	try {
		const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/dev5db";
	await DatabaseService.connect(mongoUri);

		const userRepository = new UserRepository(DatabaseService);
		const pokemonService = new PokemonService();
		const personalityService = new PersonalityService();
		const userController = new UserController(userRepository, pokemonService, personalityService);

		app.use("/", createUserRoutes(userController));

		const PORT = process.env.API_PORT || 3000;
		app.listen(PORT, () => {});
	} catch (error) {
		console.error("Failed to initialize app:", error);
		process.exit(1);
	}
}

initializeApp();
