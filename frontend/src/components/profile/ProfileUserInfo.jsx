import React, { useEffect, useState } from "react";
import * as inputValid from "utils/inputValid";
import * as axiosRequest from "utils/profileAxios";
import axios from "axios";
import { toast } from "react-toastify";
import ProfileButtons from "./ProfileButtons";
import style from "style/Profile.module.css";
import ProfileUserInput from "./ProfileUserInput";
function ProfileUserInfo({ setIntro, intro }) {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;

	const [userInfo, setUserInfo] = useState({
		email: "",
		username: "",
		phone_number: "",
		password: "",
	});

	useEffect(() => {
		axiosRequest.GETUSERINFO(setUserInfo);
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
		<form onSubmit={onSubmit}>
			<ProfileUserInput labelValue="닉네임" value={username} id="username" onChange={onChange} />
			<ProfileUserInput labelValue="Email" value={email} id="email" onChange={onChange} />
			<ProfileUserInput
				labelValue="휴대폰 번호"
				value={phone_number}
				id="phone_number"
				onChange={onChange}
			/>
			<ProfileUserInput labelValue="비밀번호" value={password} id="password" onChange={onChange} />
			<ProfileButtons password={password} />
		</form>
	);
}

export default ProfileUserInfo;
