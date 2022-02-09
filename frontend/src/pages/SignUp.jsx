import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as inputValid from "../utils/inputValid";
import style from "../style/SignIn.module.css";
import SignPassword from "../components/accounts/AccountPassword";
import { SignUpButton } from "../components/accounts/AccountButton";
import Cookies from "universal-cookie";
import AccountKakaoButton from "../components/accounts/AccountKakaoButton";
import { submitAxios } from "../utils/accountAxios";

function SignUp() {
	const cookies = new Cookies();
	const token = cookies.get("accessToken");
	const navigate = useNavigate();

	const [inputValue, setInputValue] = useState({
		email: "",
		password: "",
		username: "",
		phone_number: "",
	});

	const { email, password, username, phone_number } = inputValue;

	const isValid = inputValid.signUpValid(email, password, phone_number);

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
		isValid && submitAxios("join", inputValue, "/");
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

				<AccountKakaoButton />
			</div>
		</div>
	);
}

export default SignUp;
