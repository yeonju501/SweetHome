import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function SendMessage() {
	const token = useSelector((state) => state.token.token);

	const [sendMessage, setSendMessage] = useState({
		receiver_name: "",
		title: "",
		content: "",
	});

	function onChange(e) {
		setSendMessage({
			...sendMessage,
			[e.target.id]: e.target.value,
		});
	}

	function onSend(e) {
		e.preventDefault();
		const checkValue = e.target.checkValidity();
		if (checkValue) {
			axios({
				method: "POST",
				url: `${SERVER_URL}/api/messages/`,
				headers: { Authorization: `Bearer ${token}` },
				data: sendMessage,
			}).then((res) => {
				console.log(res);
			});
		}
		console.log(e.target.checkValidity());
	}

	const { receiver_name, title, content } = sendMessage;
	return (
		<div>
			<h1>SendMessage</h1>
			<form onSubmit={onSend}>
				<input
					type="text"
					placeholder="receiver_name"
					id="receiver_name"
					value={receiver_name}
					onChange={onChange}
					required
				/>
				<input
					type="text"
					placeholder="title"
					id="title"
					value={title}
					onChange={onChange}
					required
				/>
				<input
					type="text"
					placeholder="content"
					id="content"
					value={content}
					onChange={onChange}
					required
				/>

				<button>Send</button>
			</form>
		</div>
	);
}

export default SendMessage;
