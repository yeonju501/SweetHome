import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ReadSendMessage() {
	const token = useSelector((state) => state.token.token);
	const [sendMessageArray, setSendMessageArray] = useState([]);

	useEffect(() => {
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/messages/send`,
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((res) => {
				setSendMessageArray(res.data);
				console.log(res.data);
				console.log("저장된 값 확인", sendMessageArray);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<div>
			<h1>ReadSendMessage</h1>
			<ul>
				{sendMessageArray.map((sendMessage, idx) => (
					<li key={idx}>{sendMessage.title}</li>
				))}
			</ul>
		</div>
	);
}

export default ReadSendMessage;
