import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import style from "../style/Profile.module.css";
import * as inputValid from "../utils/inputValid";
import axios from "axios";
import { useSelector } from "react-redux";
import DeleteAccount from "../components/accounts/DeleteAccount";
import { toast } from "react-toastify";
import ProfileNav from "../components/ProfileNav";

function Profile() {
	const token = useSelector((state) => state.token.accessToken);
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const location = useLocation();
	const user = location.state.user;

	const [userInfo, setUserInfo] = useState({
		email: "",
		username: "",
		phone_number: "",
		password: "",
	});

	const [intro, setIntro] = useState({
		email: user.email,
		username: user.username,
	});

	useEffect(() => {
		axios({
			url: `${SERVER_URL}/api/members/my-profile`,
			method: "get",
			headers: { Authorization: `Bearer ${token}` },
		}).then((res) => setUserInfo(res.data));
	}, []);

	const { email, username, phone_number, password } = userInfo;

	const isValid = inputValid.profileChange(email, phone_number);

	const onChange = (e) => {
		setUserInfo({ ...userInfo, [e.target.id]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (isValid && username.trim().length > 0) {
			axios({
				method: "put",
				url: `${SERVER_URL}/api/members/my-profile`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				data: userInfo,
			})
				.then(setUserInfo({ ...userInfo, password: "" }))
				.then(() => toast.success("회원정보가 변경 되었습니다"))
				.catch((err) => console.log(err));

			setIntro({
				...intro,
				email: userInfo.email,
				username: userInfo.username,
			});
		} else {
			toast.error("회원 정보가 변경 되지 않았습니다.");
		}
	};

	return (
		<div className={style.profile}>
			<div className={style.profile_user}>
				<img src="" alt="Profile img" className={style.profile_img} />
				<div>
					<h1 className={style.title}>{intro.username}</h1>
					<p className={style.email}>{intro.email}</p>
				</div>
			</div>
			<ProfileNav />

			<form onSubmit={onSubmit}>
				<label htmlFor="username">닉네임</label>
				<input type="text" id="username" value={username || ""} onChange={onChange} />
				<label htmlFor="email">Email</label>
				<input type="text" id="email" value={email || ""} onChange={onChange} />
				<label htmlFor="phone_number">휴대폰 번호</label>
				<input type="text" id="phone_number" value={phone_number || ""} onChange={onChange} />
				<label htmlFor="address">주소</label>
				<input type="text" id="address" />
				<label htmlFor="password">비밀번호</label>
				<input type="password" id="password" value={password || ""} onChange={onChange} />

				<div style={{ display: "flex", alignItems: "center" }}>
					<button style={{ marginRight: "25rem" }}>저장</button>
					<DeleteAccount />
				</div>
			</form>
		</div>
	);
}

export default Profile;
