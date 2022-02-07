import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
	const position = location.state.position;

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
			<div className={style.btn_container}>
				{position === "receive" ? (
					<Link to="/read-send-message/message-detail/send-message">
						<button className={style.send}>답장</button>
					</Link>
				) : (
					<></>
				)}

				<button className={style.delete} onClick={onDeleteMessage}>
					삭제
				</button>

				<button className={style.delete}>신고</button>
			</div>
			<div className={style.detail_container}>
				{position === "send" ? (
					<>
						<span className={style.p_title}>받는 사람 : </span>
						<span className={style.p_content}>{messageDetail.receiver_username}</span>
						<br />
					</>
				) : (
					<>
						<span className={style.p_title}>보낸 사람 : </span>
						<span className={style.p_content}> {messageDetail.sender_username}</span>
						<br />
					</>
				)}
				<>
					<span className={style.p_title}>날짜 : </span>
					<span className={style.p_content}>{messageDetail.send_at.substring(0, 10)}</span>
					<br />
				</>
			</div>
			<div className={style.detail_container}>
				<span className={style.p_title}>제목 : </span>
				<span className={style.p_content}>{messageDetail.title}</span>
				<br />
				<span className={style.p_title}>내용 : </span>
				<span className={style.p_content}>{messageDetail.content}</span>
			</div>
		</div>
	);
}

export default ReadMessageDeatil;
