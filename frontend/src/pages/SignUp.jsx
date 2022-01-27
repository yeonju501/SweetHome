import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
	const token = window.localStorage.getItem("access_token");
	const navigate = useNavigate();

	const [inputValue, setInputValue] = useState({
		email: "",
		password: "",
		username: "",
		phone_number: "",
	});

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
		<>
			<h1>회원가입</h1>
			<span>
				이미 회원이신가요? <Link to="/sign-in">로그인</Link>
			</span>
			<form onSubmit={onSubmit}>
				<input type="text" placeholder="email" onChange={onChange} value={email} id="email" />

				<input
					type="password"
					placeholder="password"
					onChange={onChange}
					value={password}
					id="password"
				/>

				<input
					type="text"
					placeholder="username"
					onChange={onChange}
					value={username}
					id="username"
				/>
				<input
					type="text"
					placeholder="phone number without - "
					onChange={onChange}
					value={phone_number}
					id="phone_number"
				/>
				{isValid ? <button>Submit</button> : <button disabled>Submit</button>}
			</form>

			<button>카카오로 시작하기</button>
		</>
	);
}
export default SignUp;
