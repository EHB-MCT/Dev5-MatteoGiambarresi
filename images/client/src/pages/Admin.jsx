import { Link, useNavigate } from "react-router";
import UserProfile from "../components/UserProfile";

function Admin() {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("isAdminAuthenticated");
		navigate("/admin/login");
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
			<div className="absolute inset-0 bg-black opacity-20"></div>

			<div className="relative z-10 container mx-auto px-4 py-8">
				<div className="flex items-center justify-between mb-8">
					<div className="flex items-center space-x-4">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full">
							<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
								/>
							</svg>
						</div>
						<div>
							<h1 className="text-4xl font-bold text-white">Admin Panel</h1>
						</div>
					</div>

					<div className="flex items-center space-x-4">
						<Link
							to="/"
							className="group inline-flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg text-white font-medium hover:bg-white/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
						>
							<svg
								className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
							</svg>
							<span>Go Back</span>
						</Link>
						<button
							onClick={handleLogout}
							className="group inline-flex items-center space-x-2 px-6 py-3 bg-red-500/20 backdrop-blur-lg border border-red-500/50 rounded-lg text-white font-medium hover:bg-red-500/30 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
						>
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
							</svg>
							<span>Logout</span>
						</button>
					</div>
				</div>

				<UserProfile />
			</div>
		</div>
	);
}
export default Admin;
