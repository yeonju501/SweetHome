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
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	});
	return (
		<>
			<h1>어드민 동의 리스트 조회</h1>
		</>
	);
}

export default AdminAgreementListSearch;
