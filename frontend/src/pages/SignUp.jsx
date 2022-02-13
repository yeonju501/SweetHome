import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import * as inputValid from "utils/inputValid";
import style from "style/SignIn.module.css";
import AccountInput from "components/accounts/AccountInput";
import { SignUpButton } from "components/accounts/AccountButton";
import Cookies from "universal-cookie";
import AccountKakaoButton from "components/accounts/AccountKakaoButton";
import { submitAxios } from "utils/accountAxios";
import axios from "axios";

function SignUp() {
	const [isUserDupl, setIsUserDup] = useState(false);
	const cookies = new Cookies();
	const token = cookies.get("accessToken");
	const URL = process.env.REACT_APP_SERVER_URL;

	const [inputValue, setInputValue] = useState({
		email: "",
		password: "",
		username: "",
		phone_number: "",
	});

	const { email, password, username, phone_number } = inputValue;

	const isValid = inputValid.signUpValid(email, password, phone_number);

	const checkUserDup = () => {
		axios({
			url: `${URL}/api/members/exist-name`,
			method: "get",
			withCredentials: true,
			headers: {
				"Content-type": "application/json",
			},
			data: { value: username },
		})
			.then((res) => setIsUserDup(res.data.result))
			.catch((err) => console.log(err.response));
	};

	const onChange = (e) => {
		setInputValue({
			...inputValue,
			[e.target.id]: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		isValid && submitAxios("join", inputValue, "/");
	};

	return !token ? (
		<div className={style.sign_in}>
			<div className={style.sign_in_div}>
				<h1 className={style.title}>회원가입</h1>
				<span className={style.sign_up_span}>
					이미 회원이신가요?{" "}
					<Link className={style.Link} to="/sign-in">
						로그인
					</Link>
				</span>
				<form onSubmit={onSubmit} className={style.form}>
					<AccountInput onChange={onChange} password={password} email={email} />
					<input
						type="text"
						placeholder="사용자 이름"
						onChange={onChange}
						value={username}
						id="username"
						onBlur={checkUserDup}
						className={isUserDupl ? style.duplicated : null}
					/>
					<input
						type="text"
						placeholder="-을 제외하고 휴대폰 번호를 입력해주세요 "
						onChange={onChange}
						value={phone_number}
						id="phone_number"
					/>
					{isValid ? <SignUpButton valid="activated" /> : <SignUpButton valid="" />}
				</form>

				<AccountKakaoButton />
			</div>
		</div>
	) : (
		<Navigate to="/main" />
	);
}

export default SignUp;
