/**
 * Service for fetching Pokemon data from the PokeAPI
 */
class PokemonService {
	/**
	 * Fetches detailed data for a single Pokemon from the PokeAPI
	 * @param {string} name - The name of the Pokemon to fetch
	 * @returns {Promise<PokemonData>} Promise resolving to Pokemon data object
	 * @throws {Error} When API request fails or Pokemon is not found
	 * @example
	 * const pokemon = await pokemonService.fetchPokemonData("pikachu");
	 */
	async fetchPokemonData(name) {
		try {
			const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
			const data = await response.json();

			const speciesResponse = await fetch(data.species.url);
			const speciesData = await speciesResponse.json();
			const descriptionEntry = speciesData.flavor_text_entries.find((e) => e.language.name === "en");
			const description = descriptionEntry ? descriptionEntry.flavor_text : "";

			return {
				name: name,
				types: data.types.map((t) => t.type.name),
				height: data.height,
				weight: data.weight,
				description: description,
				attack: data.stats.find((s) => s.stat.name === "attack").base_stat,
				defense: data.stats.find((s) => s.stat.name === "defense").base_stat,
				speed: data.stats.find((s) => s.stat.name === "speed").base_stat,
			};
		} catch (error) {
			console.error(`Error fetching data for Pokemon ${name}:`, error);
			throw new Error(`Failed to fetch data for Pokemon: ${name}`);
		}
	}

	/**
	 * Fetches data for an entire team of Pokemon
	 * @param {string[]} team - Array of Pokemon names to fetch data for
	 * @returns {Promise<PokemonData[]>} Promise resolving to array of Pokemon data objects
	 * @example
	 * const team = ["pikachu", "charizard", "bulbasaur"];
	 * const teamData = await pokemonService.fetchTeamData(team);
	 */
	async fetchTeamData(team) {
		const teamData = [];
		for (const pokemonName of team) {
			const pokemonData = await this.fetchPokemonData(pokemonName);
			teamData.push(pokemonData);
		}
		return teamData;
	}
}

module.exports = PokemonService;