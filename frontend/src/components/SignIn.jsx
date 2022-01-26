import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn() {
	const navigate = useNavigate();

	const [inputValue, setInputValue] = useState({
		email: "",
		password: "",
	});

	const { email, password } = inputValue;
	const isValidEmail = email.includes("@") && email.includes(".");

	function onChange(e) {
		setInputValue({
			...inputValue,
			[e.target.id]: e.target.value,
		});
	}

	function onSubmit(e) {
		e.preventDefault();
		if (isValidEmail && password) {
			axios({
				url: "http://localhost:8080/api/members/login",
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				data: inputValue,
			})
				.then((res) => {
					navigate("/main");
					window.localStorage.setItem("access_token", res.data.access_token);
				})
				.catch((err) => {
					alert(err);
				});
		}
	}

	return (
		<div>
			<h1>Sweet Home</h1>
			<form onSubmit={onSubmit}>
				<input type="text" placeholder="email" id="email" onChange={onChange} value={email} />
				<input
					type="password"
					placeholder="password"
					id="password"
					onChange={onChange}
					value={password}
				/>
				<button>Sing In</button>
			</form>

			<Link to="/">Home</Link>
			<Link to="/sign-up">sign up</Link>
		</div>
	);
}

export default SignIn;
