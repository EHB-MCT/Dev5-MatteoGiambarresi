import { Link, Route, Routes, BrowserRouter } from "react-router";
import TeamSelector from "./pages/TeamSelector";
import UserName from "./pages/Username";
import Questions from "./pages/Questions";
function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<UserName />} />
					<Route path="/teamSelector" element={<TeamSelector />} />
					<Route path="/questions" element={<Questions />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
