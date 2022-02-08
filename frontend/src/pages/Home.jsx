import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import SignIn from "../components/accounts/AccountSignIn";
import style from "../style/Home.module.css";
import { ReactComponent as Apart } from "../assets/main_apartment.svg";
function Home() {
	const cookies = new Cookies();
	const navigate = useNavigate();
	const token = cookies.get("accessToken");
	useEffect(() => {
		token && navigate("/main");
	});

	return (
		<>
			<div className={style.Home_div}>
				<div className={style.Home_div_img}>
					<h2 className={style.Home_h1}>
						당신의<span className={style.Home_h1_neigh}> 이웃</span>을 만나보세요
					</h2>
					<Apart className={style.Home_img} />
				</div>
				<SignIn />
			</div>
		</>
	);
}

export default Home;
