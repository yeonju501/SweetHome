import axios from "axios";
import React from "react";
import { useState } from "react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ProfileAptEnroll() {
	const [aptEnroll, setAptEnroll] = useState({
		apt_id: "",
		dong: "",
		ho: "",
	});

	const onSubmit = (e) => {
		console.log("Enroll Submit");
		e.preventDefault();
		axios({
			method: "POST",
			url: `${SERVER_URL}/api/apts/register`,
			data: aptEnroll,
		})
			.then((res) => {
				console.log("성공");
			})
			.catch((err) => console.log(err));
	};

	const onChange = (e) => {
		setAptEnroll({ ...aptEnroll, [e.target.id]: e.target.value });
	};
	return (
		<>
			<form onSubmit={onSubmit}>
				<label htmlFor="apt_id">아파트 id</label>
				<input type="text" id="apt_id" onChange={onChange} />
				<label htmlFor="dong">동</label>
				<input type="text" id="dong" onChange={onChange} />
				<label htmlFor="ho">호</label>
				<input type="text" id="ho" onChange={onChange} />

				<div style={{ display: "flex", alignItems: "center" }}>
					<button style={{ marginRight: "25rem" }}>변경</button>
				</div>
			</form>
		</>
	);
}

export default ProfileAptEnroll;
