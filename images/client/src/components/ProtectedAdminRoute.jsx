import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import Admin from "./../pages/Admin.jsx";

function ProtectedAdminRoute() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const checkAuth = () => {
			const searchParams = new URLSearchParams(location.search);
			const justAuthenticated = searchParams.get('auth') === 'true';
			const sessionAuth = sessionStorage.getItem('adminSessionAuth') === 'true';
			
			if (justAuthenticated) {
				sessionStorage.setItem('adminSessionAuth', 'true');
				setIsAuthenticated(true);
				navigate('/admin', { replace: true });
			} else if (sessionAuth) {
				setIsAuthenticated(true);
				setIsLoading(false);
			} else {
				navigate("/admin/login");
				setIsLoading(false);
			}
		};

		checkAuth();
	}, [navigate, location]);

	useEffect(() => {
		if (isAuthenticated) {
			setIsLoading(false);
		}
	}, [isAuthenticated]);

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
