class UserRepository {
	constructor(databaseService) {
		this.db = databaseService;
	}

	async create(userData) {
		const collection = this.db.getCollection("users");
		return await collection.insertOne(userData);
	}

	async findByName(name) {
		const collection = this.db.getCollection("users");
		return await collection.findOne({ name });
	}

	async findAll() {
		const collection = this.db.getCollection("users");
		return await collection.find().toArray();
	}

	async updateTeam(name, team) {
		const collection = this.db.getCollection("users");
		return await collection.updateOne({ name }, { $set: { pokemonTeam: team } });
	}

	async updateTimer(name, timer) {
		const collection = this.db.getCollection("users");
		return await collection.updateOne({ name }, { $set: { timer } });
	}

	async updateClicks(name, clicks) {
		const collection = this.db.getCollection("users");
		return await collection.updateOne({ name }, { $set: { clicks } });
	}

	async updatePersonality(name, personality) {
		const collection = this.db.getCollection("users");
		return await collection.updateOne({ name }, { $set: { personality } });
	}

	async saveTeamDetails(teamDetails) {
		const collection = this.db.getCollection("userteamdata");
		return await collection.insertOne(teamDetails);
	}

	async savePersonalityAnalysis(personalityData) {
		const collection = this.db.getCollection("personalityanalysis");
		return await collection.insertOne(personalityData);
	}
}

module.exports = UserRepository;