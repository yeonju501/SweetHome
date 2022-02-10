import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function SiteAptAdminRegister() {
	const [aptAdminRegister, setaptAdminRegister] = useState({
		member_id: "",
		apt_id: "",
		name: "",
		email: "",
		phone_number: "",
		message: "",
	});

	useEffect(() => {
		console.log("실행");
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/superadmin/apts/apt-manager`,
		})
			.then((res) => {
				console.log("여기", res.data.register_managers);
				setaptAdminRegister(res.data.register_managers);
				console.log("저장", aptAdminRegister);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			<h1>아파트관리자등록</h1>
			<table>
				<thead>
					<tr>
						<th>신청자</th>
						<th>이메일</th>
						<th>연락처</th>
						<th>메시지</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{aptAdminRegister.length > 0 ? (
						aptAdminRegister.map((aptAdminMember, idx) => (
							<tr key={idx}>
								<td>{aptAdminMember.name}</td>
								<td>{aptAdminMember.email}</td>
								<td>{aptAdminMember.phone_number}</td>
								<td>{aptAdminMember.message}</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="6">신청자가 없습니다</td>
						</tr>
					)}
				</tbody>
			</table>
		</>
	);
}

export default SiteAptAdminRegister;
