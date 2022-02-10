import React from "react";
import { useState } from "react";

function ProfileAptEnroll() {
	const [aptAdminEnroll, setAptAdminEnroll] = useState({
		apt_id: "",
		message: "",
	});

	return (
		<>
			<form onSubmit={onSubmit}>
				<label htmlFor="apt_id">아파트 id</label>
				<input type="text" id="apt_id" />
				<label htmlFor="message">메시지</label>
				<input type="text" id="message" />

				<div style={{ display: "flex", alignItems: "center" }}>
					<button style={{ marginRight: "25rem" }}>변경</button>
				</div>
			</form>
		</>
	);
}

export default ProfileAptEnroll;
