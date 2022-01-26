import React, { useState } from "react";

function SendMessage() {
	const [sendMessage, setSendMessage] = useState({
		reciver: "",
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
		e.target.checkValidity();
		console.log(e.target.checkValidity());
	}

	const { reciver, content } = sendMessage;
	return (
		<div>
			<h1>SendMessage</h1>
			<form onSubmit={onSend}>
				<input
					type="text"
					placeholder="reciver"
					id="reciver"
					value={reciver}
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
