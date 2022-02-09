import React, { useState } from "react";
import { useEffect } from "react";

function AdminMemberList() {
	const [aptMembers, setAptMembers] = useState({
		id: "",
		name: "",
		email: "",
		phone_number: "",
		dong: "",
		ho: "",
	});

	useEffect(() => {}, []);
	return <></>;
}

export default AdminMemberList;
