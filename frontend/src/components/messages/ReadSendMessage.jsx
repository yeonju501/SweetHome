import React from "react";
import { useSelector } from "react-redux";

function ReadSendMessage() {
	const token = useSelector((state) => state.token.token);
	return (
		<div>
			<h1>ReadSendMessage</h1>
		</div>
	);
}

export default ReadSendMessage;
