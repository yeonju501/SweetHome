import React from "react";
import { useState } from "react";

function SiteAptAdminRegister() {
	const [aptAdminRegister, setaptAdminRegister] = useState({
		member_id: "",
		apt_id: "",
		name: "",
		email: "",
		phone_number: "",
		message: "",
	});

	return (
		<>
			<h1>사이트어드민등록</h1>
		</>
	);
}

export default SiteAptAdminRegister;
