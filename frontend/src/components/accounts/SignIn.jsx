import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SET_TOKEN } from "../../store/token";
import style from "../../style/SignIn.module.css";
import * as inputValid from "../../utils/inputValid";
import SignPassword from "./SignPassword";

function SignIn() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [inputValue, setInputValue] = useState({
		email: "",
		password: "",
	});

	const { email, password } = inputValue;

	const isValid = inputValid.SignInValid(email, password);

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
				url: "http://localhost:8080/api/members/login",
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				data: inputValue,
			})
				.then((res) => {
					dispatch(SET_TOKEN(res.data.access_token));
					navigate("/main");
				})
				.catch((err) => {
					console.log(err);
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

					{isValid ? (
						<button className={style.login_button}>Sign In</button>
					) : (
						<button disabled className={`${style.login_button} ${style.disabled_button}`}>
							Sign In
						</button>
					)}
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
