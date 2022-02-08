import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import style from "../../style/SignIn.module.css";
import * as inputValid from "../../utils/inputValid";
import SignPassword from "./SignPassword";
import { SignInButton } from "./SignButton";
import errorMessage from "../../store/errorMessage";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function SignIn() {
	const [inputValue, setInputValue] = useState({
		email: "",
		password: "",
	});

	const { email, password } = inputValue;

	const isValid = inputValid.signInValid(email, password);

	function onChange(e) {
		setInputValue({
			...inputValue,
			[e.target.id]: e.target.value,
		});
	}

	function onSubmit(e) {
		e.preventDefault();
		if (isValid) {
			axios({
				url: `${SERVER_URL}/api/members/login`,
				method: "POST",
				withCredentials: true,
				headers: {
					"Content-type": "application/json",
				},
				data: inputValue,
			})
				.then((res) => {})
				.catch((err) => {
					errorMessage(err.response.data.error_code);
				});
		}
	}

	return (
		<div className={style.sign_in}>
			<div className={style.sign_in_div}>
				<h1 className={style.title}>Sweet Home</h1>
				<form onSubmit={onSubmit} className={style.form}>
					<input type="text" placeholder="email" id="email" onChange={onChange} value={email} />
					<SignPassword onChange={onChange} password={password} />
					{isValid ? <SignInButton valid="activated" /> : <SignInButton valid="" />}
				</form>

				<button className={style.kakao_button}>카카오로 시작하기</button>
				<Link className={style.Link} to="/">
					비밀번호를 잊으셨나요?
				</Link>
				<Link className={style.Link} to="/sign-up">
					회원가입
				</Link>
			</div>
		</div>
	);
}

export default SignIn;
