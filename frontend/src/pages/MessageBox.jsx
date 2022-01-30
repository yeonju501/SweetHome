import React from "react";
import { Link, Outlet } from "react-router-dom";

function MessageBox() {
	return (
		<div>
			<h1>MessageBox</h1>

			<Link to="read-receive-message">ReadReceiveMessage</Link>

			<Link to="read-send-message">ReadSendMessage</Link>

			<Link to="send-message">SendMessage</Link>
			<Outlet />
		</div>
	);
}

export default MessageBox;
