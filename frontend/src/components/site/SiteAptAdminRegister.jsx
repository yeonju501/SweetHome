import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function SiteAptAdminRegister() {
	const [aptAdminRegister, setaptAdminRegister] = useState({
		member_id: "",
		apt_id: "",
		name: "",
		email: "",
		phone_number: "",
		message: "",
	});

	useEffect(() => {
		console.log("실행");
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/superadmin/apts/apt-manager`,
		})
			.then((res) => {
				console.log(res.data);
				setaptAdminRegister(res.data.register_members);
				console.log(aptAdminRegister);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			<h1>사이트어드민등록</h1>
		</>
	);
}

export default SiteAptAdminRegister;
