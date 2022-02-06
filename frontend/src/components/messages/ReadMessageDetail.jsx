import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import style from "../../style/Messages.module.css";
import { getDetailMessageFromServer } from "../../utils/messagesFunction";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ReadMessageDeatil() {
	const location = useLocation();
	const navigate = useNavigate();
	const [messageDetail, setMessageDetail] = useState({
		sender_username: "",
		sender_email: "",
		receiver_username: "",
		receiver_email: "",
		title: "",
		content: "",
		send_at: "",
		read_at: "",
	});

	useEffect(() => {
		getDetailMessageFromServer(location.state.messageId, setMessageDetail);
	}, []);

	function onDeleteMessage(e) {
		e.preventDefault();
		axios({
			method: "DELETE",
			url: `${SERVER_URL}/api/messages/${location.state.messageId}`,
		}).then((res) => {
			toast.success("메시지 삭제 완료");
			navigate("/message-box");
			console.log(res);
		});
	}

	return (
		<div>
			<h1>ReadMessageDetail</h1>
			{messageDetail.title}
			<button className={style.delete} onClick={onDeleteMessage}>
				삭제
			</button>
		</div>
	);
}

export default ReadMessageDeatil;
