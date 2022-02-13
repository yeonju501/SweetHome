import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import * as inputValid from "utils/inputValid";
import style from "style/SignIn.module.css";
import AccountInput from "components/accounts/AccountInput";
import { SignUpButton } from "components/accounts/AccountButton";
import Cookies from "universal-cookie";
import AccountKakaoButton from "components/accounts/AccountKakaoButton";
import { isThisDuplicte, submitAxios } from "utils/accountAxios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBan } from "@fortawesome/free-solid-svg-icons";

function SignUp() {
	const [isUserDupl, setIsUserDup] = useState(0);
	const cookies = new Cookies();
	const token = cookies.get("accessToken");
	const [isSignUp, setIsSignUp] = useState(true);
	const [inputValue, setInputValue] = useState({
		email: "",
		password: "",
		username: "",
		phone_number: "",
	});

	const { email, password, username, phone_number } = inputValue;

	const isValid = inputValid.signUpValid(email, password, phone_number);

	const checkUserDup = () => {
		const data = { value: username };
		username.trim() && isThisDuplicte("name", data, setIsUserDup);
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
					<AccountInput onChange={onChange} password={password} email={email} isSignUp={isSignUp} />
					<div className={style.user_name}>
						<input
							type="text"
							placeholder="사용자 이름"
							onChange={onChange}
							value={username}
							id="username"
							onBlur={checkUserDup}
						/>
						{(isUserDupl === 1 && (
							<FontAwesomeIcon icon={faBan} className={style.iconDuplicate} />
						)) ||
							(isUserDupl === 2 && <FontAwesomeIcon icon={faCheck} className={style.notDupl} />)}
					</div>

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
