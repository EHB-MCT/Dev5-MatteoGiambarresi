import { useState, useEffect, use } from "react";
function TeamSelector() {
	const [username, setUsername] = useState("");
	const [pokemonList, setPokemonList] = useState([]);
	const [selected, setSelected] = useState([]);
	const pokemons = [
		"pikachu",
		"bulbasaur",
		"charmander",
		"squirtle",
		"pidgey",
		"rattata",
		"jigglypuff",
		"meowth",
		"psyduck",
		"machop",
		"geodude",
		"eevee",
	];
	useEffect(() => {
		const userString = localStorage.getItem("user");
		const userParse = JSON.parse(userString);
		// console.log(userParse)
		setUsername(userParse.name);
	}, []);

	useEffect(() => {
		setPokemonList(pokemons);
	}, []);
	function toggleSelect(event) {
		const name = event.target.value;
		const updated = selected.concat(name);
		setSelected(updated);
		console.log(updated);
	}
	return (
		<div>
			<h1>TeamSelector Page</h1>
			<h2>{username}</h2>
			{pokemonList.map((pokemon) => (
				<div key={pokemon}>
					<p>{pokemon}</p>
					<button value={pokemon} onClick={toggleSelect}>
						add
					</button>
				</div>
			))}
		</div>
	);
}

export default TeamSelector;
