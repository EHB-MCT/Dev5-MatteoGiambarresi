import { Link, Route, Routes, BrowserRouter } from "react-router";
import TeamSelector from "./pages/TeamSelector";
import UserName from "./pages/Username";
function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<UserName />} />
					<Route path="/teamSelector" element={<TeamSelector />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
