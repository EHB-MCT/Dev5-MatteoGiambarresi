import { useState, useEffect, use } from "react";
function TeamSelector() {
	const [username, setUsername] = useState("");
	const [pokemonList, setPokemonList] = useState([]);
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

	return (
		<div>
			<h1>TeamSelector Page</h1>
			<h2>{username}</h2>
			{pokemonList.map((pokemon) => (
				<p key={pokemon}>{pokemon}</p>
			))}
		</div>
	);
}

export default TeamSelector;
