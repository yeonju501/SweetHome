import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import style from "../style/SignIn.module.css";
import * as inputValid from "../utils/inputValid";
import SignPassword from "../components/accounts/SignPassword";
import { SignUpButton } from "../components/accounts/SignButton";
import { useSelector } from "react-redux";

function SignUp() {
	const token = useSelector((state) => state.token.token);
	const navigate = useNavigate();

	const [inputValue, setInputValue] = useState({
		email: "",
		password: "",
		username: "",
		phone_number: "",
	});

	const { email, password, username, phone_number } = inputValue;

	const isValid = inputValid.SignUpValid(email, password, phone_number);

	useEffect(() => {
		token && navigate("/main");
	}, []);

	const onChange = (e) => {
		setInputValue({
			...inputValue,
			[e.target.id]: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (isValid) {
			axios({
				method: "post",
				url: "http://localhost:8080/api/members/join",
				data: inputValue,
			})
				.then(() => navigate("/sign-in"))
				.catch((err) => console.log(err));
		} else {
			alert("somethings wrong");
		}
	};

	return (
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
					<input
						type="text"
						placeholder="이메일 주소"
						onChange={onChange}
						value={email}
						id="email"
					/>

					<SignPassword onChange={onChange} password={password} />

					<input
						type="text"
						placeholder="사용자 이름"
						onChange={onChange}
						value={username}
						id="username"
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

				<button className={style.kakao_button}>카카오로 시작하기</button>
			</div>
		</div>
	);
}

export default SignUp;
