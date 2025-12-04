
import { Link } from "react-router";
import UserProfile from "../components/UserProfile";

function Admin() {
	return (
		<div className="">
			<h1>Admin side</h1>
            <Link to="/">go back</Link>
            <UserProfile/>
		</div>
	);
}
export default Admin;
