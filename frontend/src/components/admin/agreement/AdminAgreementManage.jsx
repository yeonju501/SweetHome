import AgreementCreate from "components/agreements/AgreementCreate";
import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AdminAgreementList from "components/agreements/Agreements";
import { useEffect } from "react";

function AdimnAgreementManage() {
	const [modalOpen, setModalOpen] = useState(false);

	const handleModal = () => {
		setModalOpen(false);
	};

	useEffect(() => {
		if (modalOpen) {
			document.body.style.cssText = `
		position: fixed; 
		top: -${window.scrollY}px;
		overflow-y: scroll;
		width: 100%;`;
			return () => {
				const scrollY = document.body.style.top;
				document.body.style.cssText = "";
				window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
			};
		}
	}, [modalOpen]);
	return (
		<div>
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
