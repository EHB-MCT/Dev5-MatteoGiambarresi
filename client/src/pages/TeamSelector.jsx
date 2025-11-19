import { useState, useEffect } from "react";
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
		if (selected.includes(name)) {
			const filtered = selected.filter((item) => item != name);
			setSelected(filtered);
			console.log(filtered);
		} else {
			if (selected.length == 6) {
				console.log("You can only select up to 6 Pokémon!");
				return;
			}
			const updated = selected.concat(name);
			setSelected(updated);
			console.log(updated);
		}
	}

	async function getPostData(url, method, data) {
		let resp = await fetch(url, {
			method: method,
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		return await resp.json();
	}

	function handleSubmit() {
		getPostData("http://localhost:3000/updateTeam", "PUT", {
			name: username,
			team: selected,
		}).then((data) => {
			console.log(data);
			alert(data.message);
		});
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

			<button onClick={handleSubmit}>Submit Team</button>
		</div>
	);
}

export default TeamSelector;
