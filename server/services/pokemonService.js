class PokemonService {
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