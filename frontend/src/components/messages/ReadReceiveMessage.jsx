import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function ReadReceiveMessage() {
	const token = useSelector((state) => state.token.token);

	const [readReceiveMessage, setReadReceiveMessage] = useState({
		sender_username: "",
		sender_email: "",
		reciver_username: "",
		receiver_email: "",
		title: "",
		send_at: "",
		read_at: "",
	});

	function getReceiveMessage(e) {
		e.preventDefault();
		axios({
			method: "GET",
			url: "http://localhost:8080/api/messages/send",
			headers: { Authorization: `Bearer ${token}` },
		}).then((res) => {
			setReadReceiveMessage(res.data);
			console.log(res.data);
		});
	}
	return (
		<div>
			<h1>ReadReciveMessage</h1>
			{/* {readReceiveMessage} */}
		</div>
	);
}

export default ReadReceiveMessage;
