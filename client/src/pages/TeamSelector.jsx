import { useState, useEffect } from "react";
function TeamSelector() {
	const [username, setUsername] = useState("");
	useEffect(() => {
		const userString = localStorage.getItem("user");
		setUsername(userString);
	}, []);

	return (
		<div>
			<h1>TeamSelector Page</h1>
			<h2>{username}</h2>
		</div>
	);
}

export default TeamSelector;
