import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";

function TeamSelector() {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [pokemonList, setPokemonList] = useState([]);
	const [selected, setSelected] = useState([]);
	const [seconds, setSeconds] = useState(1);
	const [minutes, setMinutes] = useState(0);
	const [click, setClick] = useState(0);
	const [pokemonImages, setPokemonImages] = useState({});

	useEffect(() => {
		const userString = localStorage.getItem("user");
		const userParse = JSON.parse(userString);
		setUsername(userParse.name);
	}, []);
	useEffect(() => {
		async function fetchPokemons() {
			try {
				const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
				const data = await res.json();
				const names = data.results.map((p) => p.name);
				setPokemonList(names);

			
				const newImages = {};
				for (const pokemon of names) {
					try {
						const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
						const data = await res.json();
						newImages[pokemon] = data.sprites.front_default;
					} catch (err) {
						newImages[pokemon] = null;
					}
				}
				setPokemonImages(newImages);
			} catch (err) {
				console.error("Error fetching Pokémon:");
			}
		}

		fetchPokemons();
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			setSeconds((prevCount) => {
				if (prevCount + 1 === 60) {
					setMinutes((prevMinutes) => prevMinutes + 1 / 2);
					return 0;
				}
				return prevCount + 1;
			});
		}, 1000);

		return () => clearTimeout(timer);
	}, [seconds]);

	function toggleSelect(event) {
		setClick(click + 1);

		const name = event.target.value;
		if (selected.includes(name)) {
			const filtered = selected.filter((item) => item != name);
			setSelected(filtered);
		} else {
			if (selected.length == 6) {
				return;
			}
			const updated = selected.concat(name);
			setSelected(updated);
		}
	}
	const finaltimer = () => {
		const m = minutes < 10 ? `0${minutes}` : minutes;
		const s = seconds < 10 ? `0${seconds}` : seconds;
		return `${m}:${s}`;
	};

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
			timer: finaltimer(),
			clicks: click,
		}).then((data) => {
			alert(data.message);
			if (data.personality) {
				localStorage.setItem("personality", JSON.stringify(data.personality));
			}
			navigate("/questions");
			return () => clearTimeout(timer);
		});
	}

	return (
		<div>
			<div>
				{selected.length > 0 && (
					<div>
						<h3>Your Team</h3>
						<div>
							{selected.map((pokemon) => (
								<span key={pokemon}>{pokemon}</span>
							))}
						</div>
					</div>
				)}
			</div>

			<div>
				{pokemonList.map((pokemon) => {
					const isSelected = selected.includes(pokemon);
					return (
						<div key={pokemon}>
							<div>{pokemonImages[pokemon] && <img src={pokemonImages[pokemon]} alt={pokemon} />}</div>
							<div>{pokemon}</div>
							<button value={pokemon} onClick={toggleSelect} disabled={!isSelected && selected.length >= 6}>
								{isSelected ? "Remove" : "Add"}
							</button>
						</div>
					);
				})}
			</div>

			<div>
				<button onClick={handleSubmit} disabled={selected.length !== 6}>
					{selected.length === 6 ? "Submit Team" : `Select ${6 - selected.length} more Pokémon`}
				</button>
			</div>
		</div>
	);
}

export default TeamSelector;
