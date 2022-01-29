import React, { useState } from "react";
import { useSelector } from "react-redux";

function ReadMessageDeatil() {
	const token = useSelector((state) => state.token.token);
	const [messageDetail, setMessageDetail] = useState({
		sender_username: "",
		sender_email,"",
    receiver_username:"",
    receiver_email:"",
    title:"",
    content:"",
    send_at:"",
    read_at:"",
	});
	return (
		<div>
			<h1>ReadMessageDetail</h1>
		</div>
	);
}

export default ReadMessageDeatil;
