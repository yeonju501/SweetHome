import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AdminAgreementList from "components/agreements/Agreements";
import AgreementCreate from "components/agreements/AgreementCreate";
import style from "style/Admin.module.css";

function AdimnAgreementManage() {
	const [modalOpen, setModalOpen] = useState(false);
	const [newAgreement, setNewAgreement] = useState(false);
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
		<div className={style.agreement_page}>
			{modalOpen && (
				<AgreementCreate
					isOpen={modalOpen}
					onCancel={handleModal}
					setNewAgreement={setNewAgreement}
				/>
			)}
			<p className={style.create_agreement}>
				<FontAwesomeIcon onClick={() => setModalOpen(true)} icon={faPlus} />
				동의서 생성
			</p>

			<div>
				<AdminAgreementList newAgreement={newAgreement} />
			</div>
		</div>
	);
}

export default AdimnAgreementManage;
