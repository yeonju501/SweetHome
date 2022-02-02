import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ReadSendMessage() {
	const token = useSelector((state) => state.token.accessToken);
	const [sendMessageArray, setSendMessageArray] = useState([]);
	const [page, setPage] = useState(0);
	const size = 10;

	useEffect(() => {
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/messages/send?page=${page}&size=${size}`,
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
	}, [page]);
	return (
		<div>
			<h1>ReadSendMessage</h1>
			<ul>
				{sendMessageArray.map((sendMessage, idx) => (
					<li key={idx}>
						<Link to="/message-box/message-detail" state={{ messageId: sendMessage.message_id }}>
							{sendMessage.message_id}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export default ReadSendMessage;
