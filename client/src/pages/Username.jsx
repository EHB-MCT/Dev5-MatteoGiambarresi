import { Link, useNavigate } from "react-router";
import { useState } from "react";
function Username() {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	// console.log(name);
	async function getPostData(url, method, data) {
		let resp = await fetch(url, {
			method: method,
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(data),
		});
		return await resp.json();
	}

	function handleSubmit() {
		getPostData("http://localhost:3000/registerName", "POST", { name }).then((data) => {
			console.log(data);
			alert(data.message);
			localStorage.setItem("user", JSON.stringify({ name: data.content.name }));
			navigate("/teamSelector");
		});
	}
	if (name === "Admin") {
		navigate("/admin");
	}
	return (
		<div>
			<h1>Enter your username</h1>
			<input type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="name" />
			<button onClick={handleSubmit} type="submit">
				Submit
			</button>
		</div>
	);
}

export default Username;
