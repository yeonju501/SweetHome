import React from "react";
import { useState } from "react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ProfileAptEnroll() {
	const [aptAdminEnroll, setAptAdminEnroll] = useState({
		apt_id: "",
		message: "",
	});

	const onChange = (e) => {
		setAptAdminEnroll({ ...aptAdminEnroll, [e.target.id]: e.target.value });
	};
	return (
		<>
			<form onSubmit={onSubmit}>
				<label htmlFor="apt_id">아파트 id</label>
				<input type="text" id="apt_id" onChange={onChange} />
				<label htmlFor="message">메시지</label>
				<input type="text" id="message" onChange={onChange} />

				<div style={{ display: "flex", alignItems: "center" }}>
					<button style={{ marginRight: "25rem" }}>변경</button>
				</div>
			</form>
		</>
	);
}

export default ProfileAptEnroll;
