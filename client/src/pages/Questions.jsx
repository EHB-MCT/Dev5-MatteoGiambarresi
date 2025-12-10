import { useEffect, useState } from "react";
import { aggressiveQuestions, anxiousQuestions, calmQuestions } from "../constants/constants";

function Questions() {
	const [personality, setPersonality] = useState("");
	const [questions, setQuestions] = useState([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [answers, setAnswers] = useState([]);
	const [isCompleted, setIsCompleted] = useState(false);

	useEffect(() => {
		const userPersonality = localStorage.getItem("personality");
		setPersonality(userPersonality);

		if (userPersonality === `"Aggressive"`) {
			setQuestions(aggressiveQuestions);
		} else if (userPersonality === `"Anxious"`) {
			setQuestions(anxiousQuestions);
		} else if (userPersonality === `"Calm"`) {
			setQuestions(calmQuestions);
		} else {
			setQuestions(aggressiveQuestions);
		}
	}, []);

	const handleAnswer = (answer) => {
		const newAnswers = [...answers, answer];
		setAnswers(newAnswers);

		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		} else {
			setIsCompleted(true);
			submitAnswers(newAnswers);
		}
	};

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

	const submitAnswers = async (finalAnswers) => {
		try {
			const userString = localStorage.getItem("user");
			const userParse = JSON.parse(userString);
			const username = userParse.name;

			getPostData("http://localhost:3000/submitAnswers", "POST", {
				username: username,
				personality: personality,
				answers: finalAnswers,
			}).then((data) => {
				alert(data.message);
			});
		} catch (error) {
			console.error("Error submitting answers:", error);
		}
	};
	if (isCompleted) {
		return (
			<div>
				<h1>Do you understand now ?</h1>
				<p>Only by you choosing your pokemonteam, I know what personnality you have and a lot more about yourself.</p>
				<p>Be aware that you can be read like a book with your data.</p>
				<p>Stay safe.</p>
			</div>
		);
	}

	const currentQuestion = questions[currentQuestionIndex];
	
	if (!currentQuestion) {
		return <div>Loading questions...</div>;
	}
	
	return (
		<div>
			<h1>Questions Page</h1>
			<p>Personality: {personality}</p>
			<p>
				Question {currentQuestionIndex + 1} of {questions.length}
			</p>

			<div>
				<h2>{currentQuestion.text}</h2>

				<div>
					<button onClick={() => handleAnswer("yes")}>Yes</button>
					<button onClick={() => handleAnswer("no")}>No</button>
				</div>
			</div>
		</div>
	);
}

export default Questions;
