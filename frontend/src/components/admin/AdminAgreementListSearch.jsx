import React from "react";
import { useState } from "react";

function AdminAgreementListSearch() {
	const [agreementList, setAgreementList] = useState({
		dong: "",
		ho: "",
		agreement_status: false,
		created_at: "",
	});
	return (
		<>
			<h1>어드민 동의 리스트 조회</h1>
		</>
	);
}

export default AdminAgreementListSearch;
