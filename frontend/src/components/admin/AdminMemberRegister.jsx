import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function AdminMemberRegister() {
	const [aptMemberRegister, setAptMemberRegister] = useState({
		id: "",
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
			<table>
				<thead>
					<tr>
						<th>신청자</th>
						<th>동</th>
						<th>호</th>
						<th>메시지</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{aptMemberRegister.length > 0 ? (
						aptMemberRegister.map((aptMember, idx) => (
							<tr key={idx}>
								<td>{aptMember.name}</td>
								<td>{aptMember.dong}</td>
								<td>{aptMember.ho}</td>
								<td>{aptMember.message}</td>
								<button>승인</button>
								<button>거절</button>
							</tr>
						))
					) : (
						<tr>
							<td>신청자가 업습니다</td>
						</tr>
					)}
				</tbody>
			</table>
		</>
	);
}

export default AdminMemberRegister;
