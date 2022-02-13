import AgreementCreate from "components/agreements/AgreementCreate";
import React from "react";
import { useState } from "react";

function AdimnAgreementManage() {
	const [modalOpen, setModalOpen] = useState(false);

	const handleModal = () => {
		setModalOpen(false);
	};
	return (
		<>
			<h1>어드민 동의서 관리</h1>
		</>
	);
}

export default AdimnAgreementManage;
