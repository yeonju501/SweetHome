import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import SignIn from "components/accounts/AccountSignIn";
import style from "style/Home.module.css";
import { ReactComponent as Apart } from "assets/main_apartment.svg";
import { useSelector } from "react-redux";

function Home() {
	const user = useSelector((state) => state.userInfo.authority);
	const cookies = new Cookies();
	const navigate = useNavigate();
	const token = cookies.get("accessToken");
	const [isThisPublic, setIsPublic] = useState(false);

	useEffect(() => {
		token && navigate("/main");
		setIsPublic(true);
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
				<SignIn isThisPublic={isThisPublic} setIsPublic={setIsPublic} />
			</div>
		</>
	);
}

export default Home;
