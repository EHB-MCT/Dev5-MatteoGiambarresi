import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
function Username() {
	const navigate = useNavigate();
	const [name, setName] = useState("");
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
			alert(data.message);
			localStorage.setItem("user", JSON.stringify({ name: data.content.name }));
			navigate("/teamSelector");
		});
	}
	useEffect(() => {
		if (name === "Admin") {
			navigate("/admin");
		}
	}, [name, navigate]);
	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
			<div className="absolute inset-0 bg-black opacity-20"></div>

			<div className="relative z-10 w-full max-w-md">
				<div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
					<div className="text-center mb-8">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4">
							<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								/>
							</svg>
						</div>
						<h1 className="text-3xl font-bold text-white mb-2">Welcome</h1>
						<p className="text-blue-200 text-sm">Enter your username to continue</p>
					</div>

					<div className="space-y-6">
						<div className="relative">
							<input
								type="text"
								value={name}
								onChange={(event) => setName(event.target.value)}
								placeholder="Enter your username"
								className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
							/>
							<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
								<svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
									/>
								</svg>
							</div>
						</div>

						<button
							onClick={handleSubmit}
							type="submit"
							disabled={!name.trim()}
							className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
						>
							Continue
						</button>
					</div>
				</div>

				<div className="mt-8 text-center">
					<div className="inline-flex items-center space-x-2 text-blue-300 text-sm">
						<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
							<path
								fillRule="evenodd"
								d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
								clipRule="evenodd"
							/>
						</svg>
						<span>Secure connection</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Username;
