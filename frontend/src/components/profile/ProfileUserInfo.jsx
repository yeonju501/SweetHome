import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBan } from "@fortawesome/free-solid-svg-icons";
import * as inputValid from "utils/inputValid";
import * as axiosRequest from "utils/profileAxios";
import axios from "axios";
import { toast } from "react-toastify";
import ProfileButtons from "./ProfileButtons";
import style from "style/Profile.module.css";
import { isThisDuplicte } from "utils/accountAxios";
import { useSelector } from "react-redux";

function ProfileUserInfo({ setIntro, intro }) {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const user = useSelector((state) => state.userInfo);
	const [isDup, setIsDup] = useState(0);
	const [userInfo, setUserInfo] = useState({
		username: "",
		email: "",
		phone_number: "",
		authority: "",
		apt_house: {},
		password: "",
	});

	useEffect(() => {
		setUserInfo(user);
	}, []);

	const { username, email, phone_number, authority, apt_house, password } = userInfo;

	const isValid = inputValid.profileChange(email, phone_number);

	const onChange = (e) => {
		setUserInfo({ ...userInfo, [e.target.id]: e.target.value });
	};

	const checkUserDup = () => {
		const data = { value: username };
		if (username === user.username) {
			return setIsDup(2);
		}
		isThisDuplicte("name", data, setIsDup);
	};
	const onSubmit = (e) => {
		e.preventDefault();
		if (isDup === 2 && isValid && username.trim().length > 0) {
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
			setIsDup(0);
		} else {
			toast.error("회원 정보가 변경 되지 않았습니다.");
		}
	};
	return (
		userInfo.username && (
			<form onSubmit={onSubmit} className={style.profile_form}>
				<div className={style.profile_user_info_div}>
					<aside>
						<label htmlFor="username">닉네임</label>
					</aside>
					<div className={style.user_name}>
						<input
							type="text"
							id="username"
							value={username || ""}
							onChange={onChange}
							onBlur={checkUserDup}
						/>
						{(isDup === 1 && <FontAwesomeIcon icon={faBan} className={style.iconDuplicate} />) ||
							(isDup === 2 && <FontAwesomeIcon icon={faCheck} className={style.notDupl} />)}
					</div>
				</div>
				<div className={style.profile_user_info_div}>
					<aside>
						<label htmlFor="email">Email</label>
					</aside>
					<input type="text" id="email" value={email || ""} onChange={onChange} />
				</div>
				<div className={style.profile_user_info_div}>
					<aside>
						<label htmlFor="phone_number">휴대폰 번호</label>
					</aside>
					<input type="text" id="phone_number" value={phone_number || ""} onChange={onChange} />
				</div>
				{apt_house && (
					<div className={style.profile_user_info_div}>
						<aside>
							<label htmlFor="apt_house">주소</label>
						</aside>
						<input type="text" readOnly id="apt_house" value={apt_house.apt.road_Name || ""} />
					</div>
				)}

				<div className={style.profile_user_info_div}>
					<aside>
						<label htmlFor="password">비밀번호</label>
					</aside>
					<input type="password" id="password" value={password || ""} onChange={onChange} />
				</div>

				<ProfileButtons password={password} isDup={isDup} />
			</form>
		)
	);
}

export default ProfileUserInfo;
