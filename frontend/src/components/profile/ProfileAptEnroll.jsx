import React from "react";
import { useState } from "react";

function ProfileAptEnroll() {
	const [aptEnroll, setAptEnroll] = useState({
		apt_id: "",
		dong: "",
		ho: "",
	});

	const onChange = (e) => {
		setAptEnroll({ ...aptEnroll, [e.target.id]: e.target.value });
	};
	return (
		<>
			<form>
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
