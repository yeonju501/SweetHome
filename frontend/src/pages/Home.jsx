import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignIn from "../components/SignIn";
import style from "../style/Home.module.css";
import { ReactComponent as Apart } from "../assets/main_apartment.svg";
function Home() {
	const navigate = useNavigate();
	const [currentUser, setCurrentUser] = useState();
	const token = useSelector((state) => state.token.token);

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
			{currentUser ? (
				navigate("/main")
			) : (
				<div className={style.div_Home}>
					<div className={style.div_Home_img}>
						<h1>당신의 이웃을 만나보세요</h1>
						<Apart className={style.Home_img} />
					</div>
					<SignIn />
				</div>
			)}
		</>
	);
}

export default Home;
