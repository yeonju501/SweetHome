import React from "react";
import { useState } from "react";

function ProfileAptEnroll() {
	const [aptEnroll, setAptEnroll] = useState({
		apt_id: "",
		dong: "",
		ho: "",
	});
	return (
		<>
			<form>
				<label htmlFor="apt_id">아파트 id</label>
				<input type="text" id="apt_id" />
				<label htmlFor="dong">동</label>
				<input type="text" id="dong" />
				<label htmlFor="ho">호</label>
				<input type="text" id="ho" />

				<div style={{ display: "flex", alignItems: "center" }}>
					<button style={{ marginRight: "25rem" }}>변경</button>
				</div>
			</form>
		</>
	);
}

export default ProfileAptEnroll;
