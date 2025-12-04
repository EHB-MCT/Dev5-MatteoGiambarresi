import { useEffect, useState } from "react";
import { agressiveQuestions, anxiousQuestions, calmQuestions } from "../constants/constants";

function Questions() {
	const [personality, setPersonality] = useState("");
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		const userPersonality = localStorage.getItem("personality");
		setPersonality(userPersonality);
		console.log(userPersonality);
		if (userPersonality === `"Aggressive"`) {
			setQuestions(agressiveQuestions);
			console.log(setQuestions(agressiveQuestions));
		} else if (userPersonality === `"Anxious"`) {
			setQuestions(anxiousQuestions);
		} else if (userPersonality === `"Calm"`) {
			setQuestions(calmQuestions);
		}
	}, []);

	return (
		<div className="questions">
			<h1>Questions Page</h1>
			<h2>{personality}</h2>
			<h2>{questions}</h2>
		</div>
	);
}

export default Questions;
