import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import style from "style/Admin.module.css";
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

	const getList = () => {
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/superadmin/apts/apt-manager`,
		})
			.then((res) => {
				setaptAdminRegister(res.data.register_managers);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		getList();
	}, []);

	const registerAptAdmin = (method, id) => {
		axios({
			method,
			url: `${SERVER_URL}/api/superadmin/apts/apt-manager/`,
			data: {
				member_id: id,
			},
		})
			.then(() => getList())
			.catch((err) => {
				console.log(err.reponse);
			});
	};

	return (
		<div className={style.apt_register_page}>
			<h1>아파트관리자등록</h1>
			<table>
				<thead>
					<tr>
						<th>신청자</th>
						<th>이메일</th>
						<th>연락처</th>
						<th>메시지</th>
						<th colSpan="2"></th>
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
								<td>
									<button
										className={style.accept}
										onClick={(e) => {
											registerAptAdmin("POST", aptAdminMember.member_id);
										}}
									>
										승인
									</button>
								</td>
								<td>
									<button
										className={style.decline}
										onClick={(e) => {
											registerAptAdmin("DELETE", aptAdminMember.member_id);
										}}
									>
										거절
									</button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="6">신청자가 없습니다</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}

export default SiteAptAdminRegister;
