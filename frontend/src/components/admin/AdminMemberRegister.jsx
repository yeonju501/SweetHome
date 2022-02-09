import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function AdminMemberRegister() {
	const [aptMemberRegister, setAptMemberRegister] = useState({
		name: "",
		email: "",
		dong: "",
		ho: "",
		message: "",
		phone_number: "",
	});
	useEffect(() => {
		console.log("실행");
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/admin/apts/register`,
		})
			.then((res) => {
				console.log(res.data);
				setAptMemberRegister(res.data.register_members);
				console.log(aptMemberRegister);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<>
			<h2>회원등록</h2>
			{aptMemberRegister.length > 0 ? (
				aptMemberRegister.map((aptMember, idx) => <p>{aptMember.name}</p>)
			) : (
				<p>신청자가 없습니다</p>
			)}
		</>
	);
}

export default AdminMemberRegister;
