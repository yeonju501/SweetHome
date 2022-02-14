import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import msgStyle from "style/Messages.module.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function AdminMemberList() {
	const [aptMembers, setAptMembers] = useState({
		id: "",
		name: "",
		email: "",
		phone_number: "",
		dong: "",
		ho: "",
	});

	useEffect(() => {
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/admin/apts/members`,
		})
			.then((res) => {
				console.log(res.data);
				setAptMembers(res.data.apt_members);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const expelMember = (id) => {
		console.log(id);
		axios({
			method: "DELETE",
			url: `${SERVER_URL}/api/admin/apts/members/${id}`,
		})
			.then((res) => {
				console.log("추방");
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<table>
			<thead>
				<tr>
					<th>신청자</th>
					<th>동</th>
					<th>호</th>
					<th>연락처</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{aptMembers.length > 0 ? (
					aptMembers.map((aptMember, idx) => (
						<tr key={idx}>
							<td>{aptMember.name}</td>
							<td>{aptMember.dong}</td>
							<td>{aptMember.ho}</td>
							<td>{aptMember.phone_number}</td>
							<button
								className={msgStyle.delete}
								onClick={(e) => {
									expelMember(aptMember.id);
								}}
							>
								추방
							</button>
						</tr>
					))
				) : (
					<tr>
						<td colSpan="5">회원이 없습니다</td>
					</tr>
				)}
			</tbody>
		</table>
	);
}

export default AdminMemberList;
