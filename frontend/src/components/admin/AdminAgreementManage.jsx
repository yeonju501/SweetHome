import AgreementCreate from "components/agreements/AgreementCreate";
import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AdminAgreementList from "components/agreements/Agreements";

function AdimnAgreementManage() {
	const [modalOpen, setModalOpen] = useState(false);

	const handleModal = () => {
		setModalOpen(false);
	};
	return (
		<div>
			<h1>어드민 동의서 관리</h1>

			{modalOpen && <AgreementCreate isOpen={modalOpen} onCancel={handleModal} />}
			<p>
				<FontAwesomeIcon onClick={() => setModalOpen(true)} icon={faPlus} />
				동의서 생성
			</p>

			<div>
				<AdminAgreementList />
			</div>
		</div>
	);
}

export default AdimnAgreementManage;
