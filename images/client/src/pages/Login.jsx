import { useState } from "react";
import { Link, useNavigate } from "react-router";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (username === "admin" && password === "password123") {
			localStorage.setItem("isAdminAuthenticated", "true");
			navigate("/admin");
		} else {
			setError("Invalid username or password");
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
			<div className="absolute inset-0 bg-black opacity-20"></div>

			<div className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 w-full max-w-md">
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mx-auto mb-4">
						<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
							/>
						</svg>
					</div>
					<h1 className="text-3xl font-bold text-white">Admin Login</h1>
					<p className="text-white/70 mt-2">Enter your credentials to access the admin panel</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label htmlFor="username" className="block text-sm font-medium text-white mb-2">
							Username
						</label>
						<input
							type="text"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
							placeholder="Enter your username"
							required
						/>
					</div>

					<div>
						<label htmlFor="password" className="block text-sm font-medium text-white mb-2">
							Password
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
							placeholder="Enter your password"
							required
						/>
					</div>

					{error && <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">{error}</div>}

					<button
						type="submit"
						className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium rounded-lg hover:from-red-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-white/50 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
					>
						Sign In
					</button>
				</form>

				<div className="mt-6 text-center">
					<Link to="/" className="text-white/70 hover:text-white text-sm transition-colors duration-300">
						← Back to Home
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Login;
