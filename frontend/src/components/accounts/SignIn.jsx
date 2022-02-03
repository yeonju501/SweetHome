import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import axios from "axios";
import { SET_TOKEN, DELETE_TOKEN } from "../../store/token";
import style from "../../style/SignIn.module.css";
import * as inputValid from "../../utils/inputValid";
import SignPassword from "./SignPassword";
import { SignInButton } from "./SignButton";
import errorMessage from "../../store/errorMessage";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function SignIn() {
	const accessToken = useSelector((state) => state.token.accessToken);
	const refreshToken = useSelector((state) => state.token.refreshToken);
	const navigate = useNavigate();
	const dispatch = useDispatch();
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

	function onSilentRefresh() {
		axios({
			url: `${SERVER_URL}/api/members/reissue`,
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			data: {
				access_token: accessToken,
				refresh_token: refreshToken,
			},
		})
			.then((res) => {
				dispatch(SET_TOKEN(res.data));
				navigate("/main");
			})
			.catch(() => {
				alert("로그인을 다시 해주세요");
				dispatch(DELETE_TOKEN());
				navigate("/sign-in");
			});
	}
	function onSubmit(e) {
		const cookies = new Cookies();
		const expires = 1000 * 3600 * 24 * 7;
		e.preventDefault();
		if (isValid) {
			axios({
				url: `${SERVER_URL}/api/members/login`,
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				data: inputValue,
			})
				.then((res) => {
					dispatch(SET_TOKEN(res.data));
					cookies.set("refreshToken", res.data.refresh_token, {
						path: "/",
						secure: true,
						// httpOnly: true,
						expires: new Date(Date.now() + expires),
					});
					navigate("/main");
					axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.access_token}`;
					setTimeout(onSilentRefresh, 1000 * 60 * 30 - 6000);
				})
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
