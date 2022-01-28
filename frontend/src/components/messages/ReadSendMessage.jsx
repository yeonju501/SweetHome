import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function ReadSendMessage() {
	const token = useSelector((state) => state.token.token);
	const [sendMessageArray, setSendMessageArray] = useState([]);

	useEffect(() => {
		axios({
			method: "GET",
			url: "http://localhost:8080/api/messages/send",
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((res) => {
				setSendMessageArray(res.data);
				console.log("저장된 값 확인", sendMessageArray);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<div>
			<h1>ReadSendMessage</h1>
		</div>
	);
}

export default ReadSendMessage;
