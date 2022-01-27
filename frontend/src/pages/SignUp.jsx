import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import style from "../style/SignIn.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function SignUp() {
	const token = window.localStorage.getItem("access_token");
	const navigate = useNavigate();

	const [inputValue, setInputValue] = useState({
		email: "",
		password: "",
		username: "",
		phone_number: "",
	});

	const [passwordType, setPasswordType] = useState({
		type: "password",
		visible: false,
	});

	const changePasswordType = () => {
		setPasswordType(() => {
			if (!passwordType.visible) {
				return { type: "text", visible: true };
			}
			return { type: "password", visible: false };
		});
	};

	const { email, password, username, phone_number } = inputValue;

	const regEmail =
		/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
	const regNumber = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
	const regPassword = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{5,20}$/;

	const isValid =
		regEmail.test(email) && regNumber.test(phone_number) && regPassword.test(password);

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

					<div className={style.password}>
						<input
							type={passwordType.type}
							placeholder="숫자 + 문자로 비밀번호를 입력하세요"
							onChange={onChange}
							value={password}
							id="password"
						/>
						{passwordType.visible ? (
							<FontAwesomeIcon
								icon={faEye}
								className={password.length ? `${style.icon}` : `${style.hidden}`}
								onClick={changePasswordType}
							/>
						) : (
							<FontAwesomeIcon
								icon={faEyeSlash}
								className={password.length ? `${style.icon}` : `${style.hidden}`}
								onClick={changePasswordType}
							/>
						)}
					</div>

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
					{isValid ? (
						<button className={style.login_button}>가입</button>
					) : (
						<button className={`${style.login_button} ${style.disabled_button}`} disabled>
							가입
						</button>
					)}
				</form>

				<button className={style.kakao_button}>카카오로 시작하기</button>
			</div>
		</div>
	);
}

export default SignUp;
