import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Admin from "./../pages/Admin.jsx";

function ProtectedAdminRoute() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const checkAuth = () => {
			const authStatus = localStorage.getItem("isAdminAuthenticated");
			if (authStatus === "true") {
				setIsAuthenticated(true);
			} else {
				navigate("/admin/login");
			}
			setIsLoading(false);
		};

		checkAuth();
	}, [navigate]);

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
				<div className="text-white text-xl">Loading...</div>
			</div>
		);
	}

	return isAuthenticated ? <Admin /> : null;
}

export default ProtectedAdminRoute;
