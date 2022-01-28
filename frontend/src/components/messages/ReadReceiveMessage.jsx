import React, { useState, useEffect } from "react";
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
	const [receiveMessageArray, setReceiveMessageArray] = useState([]);

	useEffect(() => {
		axios({
			method: "GET",
			url: "http://localhost:8080/api/messages/receive",
			headers: { Authorization: `Bearer ${token}` },
		}).then((res) => {
			setReceiveMessageArray(res.data);
			console.log("res:data", res.data);
			console.log("저장된 값 확인", receiveMessageArray);
		});
	});
	return (
		<div>
			<h1>ReadReciveMessage</h1>
		</div>
	);
}

export default ReadReceiveMessage;
