import { useEffect, useState } from "react";
import { aggressiveQuestions, anxiousQuestions, calmQuestions, loyalQuestions, naiveQuestions, timidQuestions } from "../constants/constants";

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
		} else if (userPersonality === `"Loyal"`) {
			setQuestions(loyalQuestions);
		} else if (userPersonality === `"Naive"`) {
			setQuestions(naiveQuestions);
		} else if (userPersonality === `"Timid"`) {
			setQuestions(timidQuestions);
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

			getPostData(`${import.meta.env.VITE_API_URL}/submitAnswers`, "POST", {
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
			<div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
				<div className="absolute inset-0 bg-black opacity-20"></div>

				<div className="relative z-10 max-w-2xl w-full">
					<div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
						<div className="text-center">
							<div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-6">
								<svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
									/>
								</svg>
							</div>

							<h1 className="text-3xl font-bold text-white mb-6">Do you understand now?</h1>

							<div className="space-y-4 text-blue-200">
								<p className="text-lg">Only by you choosing your Pokémon team, I know what personality you have and a lot more about yourself.</p>
								<p className="text-lg">Be aware that you can be read like a book with your data.</p>
								<p className="text-lg font-semibold text-yellow-300">Stay safe.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	const currentQuestion = questions[currentQuestionIndex];

	if (!currentQuestion) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
				<div className="text-white text-xl">Loading questions...</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
			<div className="absolute inset-0 bg-black opacity-20"></div>

			<div className="relative z-10 container mx-auto px-4 py-8">
				
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-white mb-4">Personality Questions</h1>

					
					<div className="max-w-md mx-auto mb-6">
						<div className="flex justify-between text-sm text-blue-200 mb-2">
							<span>Progress</span>
							<span>
								{currentQuestionIndex + 1} of {questions.length}
							</span>
						</div>
						<div className="w-full bg-white/20 rounded-full h-3">
							<div
								className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
								style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
							></div>
						</div>
					</div>
				</div>

				
				<div className="max-w-2xl mx-auto">
					<div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
						<div className="text-center mb-8">
							<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6">
								<span className="text-2xl font-bold text-white">{currentQuestionIndex + 1}</span>
							</div>

							<h2 className="text-2xl font-semibold text-white mb-2">{currentQuestion.text}</h2>

							<div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
						</div>

						
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<button
								onClick={() => handleAnswer("yes")}
								className="group relative py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
							>
								<span className="flex items-center justify-center">
									<svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
									</svg>
									Yes
								</span>
							</button>

							<button
								onClick={() => handleAnswer("no")}
								className="group relative py-4 px-6 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
							>
								<span className="flex items-center justify-center">
									<svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									</svg>
									No
								</span>
							</button>
						</div>

						<div className="mt-6 text-center">
							<p className="text-blue-200 text-sm">
								{currentQuestionIndex < questions.length - 1
									? `${questions.length - currentQuestionIndex - 1} question${questions.length - currentQuestionIndex - 1 > 1 ? "s" : ""} remaining`
									: "Final question"}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Questions;
