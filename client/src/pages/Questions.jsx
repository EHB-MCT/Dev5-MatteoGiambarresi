import { useEffect, useState } from "react";

function Questions() {
	const [personality, setPersonality] = useState("");

	useEffect(() => {
		const userPersonality = localStorage.getItem("personality");
		setPersonality(userPersonality);
		console.log(userPersonality);
	}, []);

	return (
		<div className="questions">
			<h1>Questions Page</h1>
			<h2>{personality}</h2>
		</div>
	);
}

export default Questions;
