import { useState } from "react";
import { Link } from "react-router-dom";
import style from "../../style/SignIn.module.css";
import * as inputValid from "../../utils/inputValid";
import AccountInput from "./AccountInput";
import { SignInButton } from "./AccountButton";
import AccountKakaoButton from "./AccountKakaoButton";
import { submitAxios } from "../../utils/accountAxios";

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
		isValid && submitAxios("login", inputValue, "/main", true);
	}

	return (
		<div className={style.sign_in}>
			<div className={style.sign_in_div}>
				<h1 className={style.title}>Sweet Home</h1>
				<form onSubmit={onSubmit} className={style.form}>
					<AccountInput onChange={onChange} password={password} email={email} />
					{isValid ? <SignInButton valid="activated" /> : <SignInButton valid="" />}
				</form>

				<AccountKakaoButton />
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
