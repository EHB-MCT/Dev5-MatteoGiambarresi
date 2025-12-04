import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";

function TeamSelector() {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [pokemonList, setPokemonList] = useState([]);
	const [selected, setSelected] = useState([]);

	useEffect(() => {
		const userString = localStorage.getItem("user");
		const userParse = JSON.parse(userString);
		// console.log(userParse)
		setUsername(userParse.name);
	}, []);
	useEffect(() => {
		async function fetchPokemons() {
			try {
				const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
				const data = await res.json();
				const names = data.results.map((p) => p.name);
				setPokemonList(names);
			} catch (err) {
				console.error("Error fetching Pokémon:");
			}
		}

		fetchPokemons();
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
		if (selected.length !== 6) {
			alert(`${6 - selected.length} more Pokemon left`);
			return;
		}
		getPostData("http://localhost:3000/updateTeam", "PUT", {
			name: username,
			team: selected,
		}).then((data) => {
			console.log(data);
			alert(data.message);
			navigate("/questions");
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
			<h1>{selected.length}/6</h1>
			<button onClick={handleSubmit}>Submit Team</button>
		</div>
	);
}

export default TeamSelector;
