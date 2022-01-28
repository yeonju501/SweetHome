import React, { useState } from "react";

function ReadReceiveMessage() {

	const [readReceiveMessage, setReadReceiveMessage] = useState({
		sender_username: "",
		sender_email: "",
		reciver_username: "",
		receiver_email: "",
		title: "",
		send_at: "",
		read_at: "",
	});


	return (
		<div>
			<h1>ReadReciveMessage</h1>
		</div>
	);
}

export default ReadReceiveMessage;
