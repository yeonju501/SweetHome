import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function AdminMemberRegister() {
	const [aptMemberRegister, setAptMemberRegister] = useState({
		name: "",
		email: "",
		dong: "",
		ho: "",
		message: "",
		phone_number: "",
	});
	useEffect(() => {}, []);
	return;
}

export default AdminMemberRegister;
