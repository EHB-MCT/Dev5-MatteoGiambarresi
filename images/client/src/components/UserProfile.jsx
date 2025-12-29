import { useEffect, useState } from "react";

function UserProfile() {
	const [users, setUsers] = useState([]);
	const [top5Pokemon, setTop5Pokemon] = useState([]);

	useEffect(() => {
		async function getUsers() {
			try {
				const res = await fetch(`${import.meta.env.VITE_API_URL}/users`);
				const data = await res.json();
				setUsers(data);
			} catch (err) {
				console.error("Fetch failed");
			}
		}

		async function getTop5Pokemon() {
			try {
				const res = await fetch(`${import.meta.env.VITE_API_URL}/top5pokemon`);
				const data = await res.json();
				setTop5Pokemon(data);
			} catch (err) {
				console.error("Fetch top 5 failed");
			}
		}

		getUsers();
		getTop5Pokemon();
	}, []);

	return (
		<div>
			<div className="text-center mb-10">
				<div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4">
					<svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
						/>
					</svg>
				</div>
				<h1 className="text-4xl font-bold text-white mb-2">User Dashboard</h1>
				<p className="text-blue-200">Analytics and user insights</p>
			</div>

			<div className="max-w-4xl mx-auto mb-10">
				<div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
					<div className="flex items-center mb-6">
						<h2 className="text-2xl font-bold text-white">Top 5 Most Selected Pokémon</h2>
					</div>

					<div className="space-y-3">
						{top5Pokemon.map((pokemon, index) => (
							<div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/10">
								<div className="flex items-center space-x-4">
									<div
										className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
											index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : index === 2 ? "bg-orange-600" : "bg-blue-600"
										}`}
									>
										{index + 1}
									</div>
									<div>
										<h3 className="text-white font-semibold capitalize">{pokemon.pokemon}</h3>
										<p className="text-blue-200 text-sm">Most popular choice</p>
									</div>
								</div>
								<div className="text-right">
									<p className="text-2xl font-bold text-white">{pokemon.selectionCount}</p>
									<p className="text-blue-200 text-sm">selections</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="max-w-6xl mx-auto">
				<div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
					<div className="flex items-center mb-6">
						<svg className="w-8 h-8 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
							/>
						</svg>
						<h2 className="text-2xl font-bold text-white">Users ({users.length})</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{users.map((user, index) => (
							<div
								key={index}
								className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
							>
								<div className="flex items-center mb-4">
									<div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
										<span className="text-white font-bold text-lg">{user.name.charAt(0).toUpperCase()}</span>
									</div>
									<div>
										<h3 className="text-white font-semibold text-lg">{user.name}</h3>
										<p className="text-blue-200 text-sm">Player</p>
									</div>
								</div>

								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<span className="text-blue-200 text-sm">Personality:</span>
										<span className="text-white font-medium capitalize">{user.personality?.replace(/"/g, "")}</span>
									</div>

									<div className="flex items-center justify-between">
										<span className="text-blue-200 text-sm">Clicks:</span>
										<span className="text-white font-medium">{user.clicks}</span>
									</div>

									<div className="flex items-center justify-between">
										<span className="text-blue-200 text-sm">Time:</span>
										<span className="text-white font-medium font-mono">{user.timer}</span>
									</div>

									<div>
										<p className="text-blue-200 text-sm mb-2">Team:</p>
										<div className="flex flex-wrap gap-1">
											{user.pokemonTeam.map((pokemon, teamIndex) => (
												<span
													key={teamIndex}
													className="inline-block bg-purple-500/20 text-purple-200 text-xs px-2 py-1 rounded-full border border-purple-400/30 capitalize"
												>
													{pokemon}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserProfile;
