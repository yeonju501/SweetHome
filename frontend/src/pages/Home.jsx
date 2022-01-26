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
				<div className={style.Home_div}>
					<div className={style.Home_div_img}>
						<h2 className={style.Home_h1}>
							당신의<span className={style.Home_h1_neigh}> 이웃</span>을 만나보세요
						</h2>
						<Apart className={style.Home_img} />
					</div>
					<SignIn />
				</div>
			)}
		</>
	);
}

export default Home;
