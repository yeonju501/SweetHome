import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import style from "style/Admin.module.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function AdminAgreementListSearch() {
	const [agreementList, setAgreementList] = useState({
		dong: "",
		ho: "",
		agreement_status: false,
		created_at: "",
	});
	const location = useLocation();
	const agreementId = location.state.agreementId;

	useEffect(() => {
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/admin/agreements/agree/${agreementId}`,
		})
			.then((res) => {
				setAgreementList(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<table className={style.agreement_table}>
			<thead>
				<tr>
					<th>순서</th>
					<th>동</th>
					<th>호</th>
					<th>동의여부</th>
					<th>동의 날짜</th>
				</tr>
			</thead>
			<tbody className={style.agreement_tbody}>
				{agreementList.length > 0 ? (
					agreementList.map((agreement, idx) => (
						<tr key={idx}>
							<td>{idx + 1}</td>
							<td>{agreement.dong}</td>
							<td>{agreement.ho}</td>
							<td>{agreement.agreement_status === true ? <p>동의 완료</p> : <p>동의 거절</p>}</td>
							<td>{agreement.created_at}</td>
						</tr>
					))
				) : (
					<tr>
						<td colSpan="5" className={style.nothing}>
							동의 목록이 없습니다
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
}

export default AdminAgreementListSearch;
