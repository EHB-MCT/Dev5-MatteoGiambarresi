import { Link } from "react-router";

function UserName() {
	return (
		<div>
			<h1>UserNamePage</h1>
			<Link to="/teamSelector">
				<button>start experience</button>
			</Link>
		</div>
	);
}

export default UserName;
