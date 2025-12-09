import { useEffect, useState } from "react";

function UserProfile() {
	const [users, setUsers] = useState([]);
	const [top5Pokemon, setTop5Pokemon] = useState([]);

	useEffect(() => {
		async function getUsers() {
			try {
				const res = await fetch("http://localhost:3000/users");
				const data = await res.json();
				setUsers(data);
			} catch (err) {
				console.error("Fetch failed");
			}
		}

		async function getTop5Pokemon() {
			try {
				const res = await fetch("http://localhost:3000/top5pokemon");
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
			<h1>User Dashoard</h1>

			<div>
				<h2>Top 5 Most Selected Pokemon</h2>
				<ol>
					{top5Pokemon.map((pokemon, index) => (
						<li key={index}>
							{pokemon.pokemon} - {pokemon.selectionCount} selections
						</li>
					))}
				</ol>
			</div>

			<div>
				<h2>Users</h2>
				{users.map((user, index) => (
					<div key={index}>
						<h3>{user.name}</h3>
						<p>Team: {user.pokemonTeam.join(" ")}</p>
						<p>Personality: {user.personality}</p>
						<p>amount of clicks: {user.clicks}</p>
						<p>timer: {user.timer}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default UserProfile;
