import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import style from "../style/Profile.module.css";
import * as inputValid from "../utils/inputValid";
import axios from "axios";
import { useSelector } from "react-redux";
import DeleteAccount from "../components/accounts/DeleteAccount";

function Profile() {
	const token = useSelector((state) => state.token.token);
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const location = useLocation();
	const user = location.state.user;
	const arr = ["회원정보", "내가 작성한 글", "내가 작성한 댓글", "내가 좋아요한 글"];

	const [change, setChange] = useState(false);
	const [active, setActive] = useState(-1);
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

				.catch((err) => console.log(err));

			setIntro({
				...intro,
				email: userInfo.email,
				username: userInfo.username,
			});
		} else {
			alert("정보를 형식에 맞게 다시 입력해주세요");
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
			<div>
				<ul className={style.nav}>
					{arr.map((item, idx) => (
						<li
							className={active === idx ? style.active : style.deactive}
							key={idx}
							onClick={() => setActive(idx)}
						>
							{item}
						</li>
					))}
				</ul>
			</div>

			<form onSubmit={onSubmit}>
				<label htmlFor="username">닉네임</label>
				<input type="text" id="username" value={username} onChange={onChange} />
				<label htmlFor="email">Email</label>
				<input type="text" id="email" value={email} onChange={onChange} />
				<label htmlFor="phone_number">휴대폰 번호</label>
				<input type="text" id="phone_number" value={phone_number} onChange={onChange} />
				<label htmlFor="address">주소</label>
				<input type="text" id="address" />
				<label htmlFor="password">비밀번호</label>
				<input type="password" id="password" value={password} onChange={onChange} />

				{change && <p>정보가 성공적으로 변경되었습니다</p>}
				<div style={{ display: "flex", alignItems: "center" }}>
					<button style={{ marginRight: "25rem" }}>저장</button>
					<DeleteAccount />
				</div>
			</form>
		</div>
	);
}

export default Profile;
