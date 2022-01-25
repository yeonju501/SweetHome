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

	const isValidEmail = email.includes("@") && email.includes(".");

	useEffect(() => {
		token && navigate("/main");
	}, [token]);

	const onChange = (e) => {
		setInputValue({
			...inputValue,
			[e.target.id]: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (isValidEmail) {
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
			<form onSubmit={onSubmit}>
				<input
					type="text"
					placeholder="email"
					onChange={onChange}
					value={email}
					id="email"
					required
				/>

				<input
					type="password"
					placeholder="password"
					onChange={onChange}
					value={password}
					id="password"
					required
				/>

				<input
					type="text"
					placeholder="username"
					onChange={onChange}
					value={username}
					id="username"
					required
				/>
				<input
					type="text"
					placeholder="phone number without - "
					onChange={onChange}
					value={phone_number}
					id="phone_number"
					required
				/>
				<button>Submit</button>
			</form>
		</>
	);
}
export default SignUp;
