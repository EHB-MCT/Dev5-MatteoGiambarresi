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
		async function fetchRandomPokemons() {
			const pokemonIds = [];
			for (let i = 0; i < 20; i++) {
				const randomId = Math.floor(Math.random() * 1025) + 1;
				pokemonIds.push(randomId);
			}

			const pokemonNames = [];
			const images = {};

			for (let id of pokemonIds) {
				try {
					const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
					const data = await res.json();
					pokemonNames.push(data.name);
					images[data.name] = data.sprites.front_default;
				} catch (err) {
					console.error(`Error fetching Pokémon #${id}`, err);
				}
			}

			setPokemonList(pokemonNames);
			setPokemonImages(images);
		}

		fetchRandomPokemons();
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
		<div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
			<div className="absolute inset-0 bg-black opacity-20"></div>

			<div className="relative z-10 container mx-auto px-4 py-8">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-white mb-2">Choose Your Team </h1>
					<h1 className="text-2xl font-bold text-pink-200 mb-2">{username}</h1>
					<p className="text-blue-200 mb-4"> Select 6 Pokémon to build your team</p>

					<div className="flex justify-center items-center space-x-8 text-white">
						<div className="flex items-center space-x-2">
							<svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<span className="font-mono text-lg">{finaltimer()}</span>
						</div>
					</div>
				</div>

				{/* Selected Team Display */}
				{selected.length > 0 && (
					<div className="max-w-4xl mx-auto mb-8">
						<div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
							<h3 className="text-xl font-semibold text-white mb-4 flex items-center">
								<svg className="w-6 h-6 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
									/>
								</svg>
								Your Team ({selected.length}/6)
							</h3>
							<div className="grid grid-cols-3 md:grid-cols-6 gap-3">
								{selected.map((pokemon) => (
									<div key={pokemon} className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm border border-white/10">
										{pokemonImages[pokemon] && <img src={pokemonImages[pokemon]} alt={pokemon} className="w-12 h-12 mx-auto mb-1" />}
										<p className="text-white text-xs font-medium capitalize">{pokemon}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				)}

				{/* Pokemon Grid */}
				<div className="max-w-6xl mx-auto mb-8">
					<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
						{pokemonList.map((pokemon) => {
							const isSelected = selected.includes(pokemon);
							return (
								<div
									key={pokemon}
									className={`bg-white/10 backdrop-blur-lg rounded-xl border transition-all duration-300 hover:scale-105 ${
										isSelected ? "border-purple-400 bg-purple-500/20 shadow-lg shadow-purple-500/30" : "border-white/20 hover:border-blue-400"
									}`}
								>
									<div className="p-4 text-center">
										{pokemonImages[pokemon] ? (
											<img src={pokemonImages[pokemon]} alt={pokemon} className="w-20 h-20 mx-auto mb-3 pixelated" />
										) : (
											<div className="w-20 h-20 mx-auto mb-3 bg-gray-600/30 rounded-lg flex items-center justify-center">
												<svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
													/>
												</svg>
											</div>
										)}
										<h4 className="text-white font-medium capitalize mb-3">{pokemon}</h4>
										<button
											value={pokemon}
											onClick={toggleSelect}
											disabled={!isSelected && selected.length >= 6}
											className={`w-full py-2 px-3 rounded-lg font-medium transition-all duration-300 transform active:scale-95 ${
												isSelected
													? "bg-red-500 hover:bg-red-600 text-white"
													: selected.length >= 6
													? "bg-gray-600/50 text-gray-400 cursor-not-allowed"
													: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
											}`}
										>
											{isSelected ? "Remove" : "Add"}
										</button>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* Submit Button */}
				<div className="max-w-md mx-auto">
					<button
						onClick={handleSubmit}
						disabled={selected.length !== 6}
						className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform ${
							selected.length === 6
								? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:scale-[1.02] active:scale-[0.98]"
								: "bg-gray-600/50 text-gray-400 cursor-not-allowed"
						}`}
					>
						{selected.length === 6 ? (
							<span className="flex items-center justify-center">
								<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
								</svg>
								Submit Team
							</span>
						) : (
							<span className="flex items-center justify-center">
								<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
								</svg>
								Select {6 - selected.length} more Pokémon
							</span>
						)}
					</button>
				</div>
			</div>
		</div>
	);
}

export default TeamSelector;
