/**
 * Service for calculating personality traits based on Pokemon team composition
 */
class PersonalityService {
	/**
	 * Creates an instance of PersonalityService with predefined personality configurations
	 */
	constructor() {
		/**
		 * Configuration object defining scoring criteria for each personality type
		 * @type {Object.<string, PersonalityConfig>}
		 */
		this.personalityConfigs = {
			Aggressive: {
				attack: { min: 70, points: 1 },
				height: { min: 10, points: 1 },
				types: ["fire", "dragon", "electric"],
				descriptions: ["intimidates", "angry", "strong", "charges"]
			},
			Calm: {
				attack: { max: 60, points: 1 },
				height: { min: 12, points: 1 },
				speed: { max: 50, points: 1 },
				types: ["water", "psychic", "normal"],
				descriptions: ["gentle", "calm", "peaceful", "serene", "tranquil", "protective"]
			},
			Anxious: {
				attack: { max: 40, points: 1 },
				height: { max: 8, points: 1 },
				speed: { min: 80, points: 1 },
				types: ["ghost", "bug", "ice"],
				descriptions: ["timid", "nervous", "shy", "jumps", "cautious", "fearful"]
			},
			Loyal: {
				attack: { min: 50, max: 80, points: 1 },
				height: { min: 8, max: 15, points: 1 },
				types: ["normal", "fighting", "fairy"],
				descriptions: ["loyal", "protective", "devoted", "faithful", "guardian"]
			},
			Naive: {
				attack: { min: 40, max: 70, points: 1 },
				height: { min: 5, max: 12, points: 1 },
				types: ["normal", "fairy", "psychic"],
				descriptions: ["innocent", "curious", "playful", "friendly", "gentle"]
			},
			Timid: {
				attack: { max: 50, points: 1 },
				height: { max: 10, points: 1 },
				speed: { min: 60, points: 1 },
				types: ["psychic", "ghost", "fairy"],
				descriptions: ["shy", "timid", "nervous", "cautious", "fearful"]
			}
		};
	}

	/**
	 * Calculates personality scores for a team of Pokemon
	 * @param {PokemonData[]} team - Array of Pokemon objects with stats and descriptions
	 * @returns {PersonalityResult} Object containing the winning personality and all scores
	 * @example
	 * const result = personalityService.calculatePersonality(teamData);
	 */
	calculatePersonality(team) {
		/** @type {Object.<string, number>} */
		const scores = Object.keys(this.personalityConfigs).reduce((acc, personality) => {
			acc[personality] = 0;
			return acc;
		}, {});

		team.forEach((pokemon) => {
			Object.keys(this.personalityConfigs).forEach(personality => {
				scores[personality] += this.calculatePersonalityScore(pokemon, personality);
			});
		});

		const winner = Object.keys(scores).reduce((a, b) => {
			return scores[a] > scores[b] ? a : b;
		});

		return {
			winner: winner,
			scores: scores,
		};
	}

	/**
	 * Calculates the score contribution of a single Pokemon for a specific personality type
	 * @param {PokemonData} pokemon - Pokemon object containing stats, types, and description
	 * @param {string} personality - The personality type to calculate score for
	 * @returns {number} The score contribution for this Pokemon and personality combination
	 * @example
	 * const score = personalityService.calculatePersonalityScore(pokemon, "Aggressive");
	 * // Returns 3 if Pokemon matches all aggressive criteria
	 */
	calculatePersonalityScore(pokemon, personality) {
		const config = this.personalityConfigs[personality];
		let score = 0;

		if (config.attack) {
			if (config.attack.min !== undefined && pokemon.attack >= config.attack.min) {
				score += config.attack.points;
			}
			if (config.attack.max !== undefined && pokemon.attack <= config.attack.max) {
				score += config.attack.points;
			}
		}

		if (config.height) {
			if (config.height.min !== undefined && pokemon.height >= config.height.min) {
				score += config.height.points;
			}
			if (config.height.max !== undefined && pokemon.height <= config.height.max) {
				score += config.height.points;
			}
		}

		if (config.speed) {
			if (config.speed.min !== undefined && pokemon.speed >= config.speed.min) {
				score += config.speed.points;
			}
			if (config.speed.max !== undefined && pokemon.speed <= config.speed.max) {
				score += config.speed.points;
			}
		}

		if (config.types && config.types.some(type => pokemon.types.includes(type))) {
			score += 1;
		}

		if (config.descriptions && pokemon.description) {
			const desc = pokemon.description.toLowerCase();
			if (config.descriptions.some(keyword => desc.includes(keyword))) {
				score += 1;
			}
		}

		return score;
	}
}

/**
 * @typedef {Object} PersonalityConfig
 * @property {StatConfig} [attack] - Attack stat configuration
 * @property {StatConfig} [height] - Height stat configuration  
 * @property {StatConfig} [speed] - Speed stat configuration
 * @property {string[]} [types] - Pokemon types that match this personality
 * @property {string[]} [descriptions] - Keywords to match in Pokemon descriptions
 */

/**
 * @typedef {Object} StatConfig
 * @property {number} [min] - Minimum value threshold
 * @property {number} [max] - Maximum value threshold
 * @property {number} points - Points awarded when criteria is met
 */

/**
 * @typedef {Object} PokemonData
 * @property {string} name - Pokemon name
 * @property {string[]} types - Array of Pokemon types
 * @property {number} height - Pokemon height
 * @property {number} weight - Pokemon weight
 * @property {string} description - Pokemon description text
 * @property {number} attack - Attack stat value
 * @property {number} defense - Defense stat value
 * @property {number} speed - Speed stat value
 */

/**
 * @typedef {Object} PersonalityResult
 * @property {string} winner - The personality type with the highest score
 * @property {Object.<string, number>} scores - All personality scores
 */

module.exports = PersonalityService;