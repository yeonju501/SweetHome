import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function AdminMemberList() {
	const [aptMembers, setAptMembers] = useState({
		id: "",
		name: "",
		email: "",
		phone_number: "",
		dong: "",
		ho: "",
	});

	useEffect(() => {
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/admin/apts/members`,
		})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return <></>;
}

export default AdminMemberList;
