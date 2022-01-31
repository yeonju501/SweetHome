import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ReadMessageDeatil() {
	const token = useSelector((state) => state.token.accessToken);
	const [messageDetail, setMessageDetail] = useState({
		sender_username: "",
		sender_email: "",
		receiver_username: "",
		receiver_email: "",
		title: "",
		content: "",
		send_at: "",
		read_at: "",
	});

	useEffect(() => {
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/messages/1`,
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((res) => {
				console.log(res.data);
				setMessageDetail(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<div>
			<h1>ReadMessageDetail</h1>
			{messageDetail.title}
		</div>
	);
}

export default ReadMessageDeatil;
