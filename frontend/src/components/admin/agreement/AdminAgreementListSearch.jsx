import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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
				console.log("받아오기", res.data);
				setAgreementList(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<table>
			<thead>
				<tr>
					<th>동</th>
					<th>호</th>
					<th>동의여부</th>
					<th>동의 날짜</th>
				</tr>
			</thead>
			<tbody>
				{agreementList.length > 0 ? (
					agreementList.map((agreement, idx) => (
						<tr key={idx}>
							<td>{agreement.dong}</td>
							<td>{agreement.ho}</td>
							<td>{agreement.agreement_status === true ? <p>동의 완료</p> : <p>동의 거절</p>}</td>
							<td>{agreement.created_at}</td>
						</tr>
					))
				) : (
					<tr>
						<td colSpan="4">동의 목록이 없습니다</td>
					</tr>
				)}
			</tbody>
		</table>
	);
}

export default AdminAgreementListSearch;
