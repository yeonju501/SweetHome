import AgreementCreate from "components/agreements/AgreementCreate";
import React from "react";
import { useState } from "react";
import AgreementCreate from "components/agreements/AgreementCreate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AdimnAgreementManage() {
	const [modalOpen, setModalOpen] = useState(false);

	const handleModal = () => {
		setModalOpen(false);
	};
	return (
		<>
			<h1>어드민 동의서 관리</h1>
			{modalOpen && <AgreementCreate isOpen={modalOpen} onCancel={handleModal} />}
			<p>
				<FontAwesomeIcon onClick={() => setModalOpen(true)} icon={faPlus} />
				게시판 생성 요청
			</p>
		</>
	);
}

export default AdimnAgreementManage;
