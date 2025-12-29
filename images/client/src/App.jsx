import { Link, Route, Routes, BrowserRouter } from "react-router";
import TeamSelector from "./pages/TeamSelector";
import UserName from "./pages/Username";
import Questions from "./pages/Questions";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<UserName />} />
					<Route path="/teamSelector" element={<TeamSelector />} />
					<Route path="/questions" element={<Questions />} />
					<Route path="/admin/login" element={<Login />} />
					<Route path="/admin" element={<ProtectedAdminRoute />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
