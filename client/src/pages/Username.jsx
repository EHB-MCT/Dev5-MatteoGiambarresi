import { Link } from "react-router";
import { useState } from "react";
function Username() {
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
		});
	}

	return (
		<div>
			<h1>Enter your username</h1>
			<input type="text" onChange={(event) => setName(event.target.value)} placeholder="name" />
			<button onClick={handleSubmit} type="submit">
				Submit
			</button>
			{/* <Link to="/teamSelector">
				<button>start experience</button>
			</Link> */}
		</div>
	);
}

export default Username;
