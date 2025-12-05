class PersonalityService {
	calculatePersonality(team) {
		const scores = {
			Aggressive: 0,
			Calm: 0,
			Anxious: 0,
			Loyal: 0,
			Naive: 0,
			Timid: 0,
		};

		team.forEach((pokemon) => {
			this.calculateAggressiveScore(pokemon, scores);
			this.calculateCalmScore(pokemon, scores);
			this.calculateAnxiousScore(pokemon, scores);
		});

		const winner = Object.keys(scores).reduce((a, b) => {
			return scores[a] > scores[b] ? a : b;
		});

		return {
			winner: winner,
			scores: scores,
		};
	}

	calculateAggressiveScore(pokemon, scores) {
		if (pokemon.attack >= 70) scores.Aggressive += 1;
		if (pokemon.height >= 10) scores.Aggressive += 1;
		if (pokemon.types.includes("fire") || pokemon.types.includes("dragon") || pokemon.types.includes("electric")) {
			scores.Aggressive += 1;
		}
		if (pokemon.description) {
			const desc = pokemon.description.toLowerCase();
			if (desc.includes("intimidates") || desc.includes("angry") || desc.includes("strong") || desc.includes("charges")) {
				scores.Aggressive += 1;
			}
		}
	}

	calculateCalmScore(pokemon, scores) {
		if (pokemon.types.includes("water") || pokemon.types.includes("psychic") || pokemon.types.includes("normal")) {
			scores.Calm += 1;
		}
		if (pokemon.height >= 12) scores.Calm += 1;
		if (pokemon.speed <= 50) scores.Calm += 1;
		if (pokemon.attack <= 60) scores.Calm += 1;
		if (pokemon.description) {
			const desc = pokemon.description.toLowerCase();
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
	}

	calculateAnxiousScore(pokemon, scores) {
		if (pokemon.speed >= 80) scores.Anxious += 1;
		if (pokemon.types.includes("ghost") || pokemon.types.includes("bug") || pokemon.types.includes("ice")) {
			scores.Anxious += 1;
		}
		if (pokemon.attack <= 40) scores.Anxious += 1;
		if (pokemon.height <= 8) scores.Anxious += 1;
		if (pokemon.description) {
			const desc = pokemon.description.toLowerCase();
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
	}
}

module.exports = PersonalityService;