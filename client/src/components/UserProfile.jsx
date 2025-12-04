import { useEffect, useState } from "react";

function UserProfile() {
	const [users, setUsers] = useState([]);

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
		getUsers();
	}, []);

	return (
		<div>
			<h1>User Dashoard</h1>
			{users.map((user, index) => (
				<div key={index}>
					<h3>{user.name}</h3>
					<p>Team: {user.pokemonTeam.join(" ")}</p>
					<p>Personality: {user.personality}</p>
				</div>
			))}
		</div>
	);
}

export default UserProfile;
