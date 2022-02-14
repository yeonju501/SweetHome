import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import msgStyle from "style/Messages.module.css";

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
				setAptMemberRegister(res.data.register_members);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const registerMember = (method_, id) => {
		console.log(method_, id);
		axios({
			method: method_,
			url: `${SERVER_URL}/api/admin/apts/register`,
			data: {
				apt_house_member_id: id,
			},
		}).catch((err) => {
			console.log(err);
		});
	};
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
								<button
									className={msgStyle.send}
									onClick={(e) => {
										registerMember("POST", aptMember.id);
									}}
								>
									승인
								</button>
								<button
									className={msgStyle.delete}
									onClick={(e) => {
										registerMember("DELETE", aptMember.id);
									}}
								>
									거절
								</button>
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

export default AdminMemberRegister;
