import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SET_TOKEN } from "../store/token";
import style from "../style/SignIn.module.css";

function SignIn() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [inputValue, setInputValue] = useState({
		email: "",
		password: "",
	});

	const { email, password } = inputValue;
	const regEmail =
		/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

	function onChange(e) {
		setInputValue({
			...inputValue,
			[e.target.id]: e.target.value,
		});
	}

	function onSubmit(e) {
		e.preventDefault();
		if (regEmail.test(email) && password) {
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
					<input
						type="password"
						placeholder="password"
						id="password"
						onChange={onChange}
						value={password}
					/>

					{regEmail.test(email) && password.length > 5 ? (
						<button className={style.login_button}>Sign In</button>
					) : (
						<button className={`${style.login_button} ${style.disabled_button}`}>Sign In</button>
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
