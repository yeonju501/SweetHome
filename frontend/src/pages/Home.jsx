import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignIn from "../components/SignIn";

function Home() {
	const navigate = useNavigate();
	const token = window.localStorage.getItem("access_token");
	const [currentUser, setCurrentUser] = useState();

	useEffect(() => {
		(async function fetchData() {
			if (token) {
				axios({
					url: "http://localhost:8080/api/members/my-profile",
					headers: { Authorization: `Bearer ${token}` },
					method: "get",
				}).then((res) => {
					setCurrentUser(res.data);
				});
			}
		})();
	}, [token]);

	return (
		<>
			<h1>Sweet Home</h1>
			{currentUser ? (
				navigate("/main")
			) : (
				<div>
					<p>{token}dd</p>
					<SignIn />
					<Link to="/sign-up">Sign Up</Link>
				</div>
			)}
		</>
	);
}

export default Home;
