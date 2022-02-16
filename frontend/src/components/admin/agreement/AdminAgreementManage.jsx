import { useState } from "react";

import AdminAgreementList from "components/agreements/Agreements";
import style from "style/Admin.module.css";

function AdimnAgreementManage() {
	const [newAgreement, setNewAgreement] = useState(false);

	return (
		<div className={style.agreement_page}>
			<AdminAgreementList newAgreement={newAgreement} />
		</div>
	);
}

export default AdimnAgreementManage;
