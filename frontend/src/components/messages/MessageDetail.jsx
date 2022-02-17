import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import style from "style/Messages.module.css";
import { getDetailMessageFromServer } from "utils/messagesFunction";
import { useDispatch } from "react-redux";
import { SET_MESSAGE } from "store/message";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ReadMessageDeatil() {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

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
		});
	}

	const handleReplyButtonClick = async () => {
		await dispatch(
			SET_MESSAGE({
				username: messageDetail.sender_username,
			}),
		);
		await window.open(
			`/send-message/${messageDetail.sender_username}`,
			`/send-message/${messageDetail.sender_username}`,
			"width=450, height=500,location=no,status=no",
		);
	};

	return (
		<div className={style.message_detail_container}>
			{position === "receive" ? (
				<div className={style.msg_detail_to}>
					<div>
						<span className={style.p_title}>보낸 사람 : </span>
						<span className={style.p_content}> {messageDetail.sender_username}</span>
						<br />
					</div>
					<div>
						<button onClick={handleReplyButtonClick} className={style.reply}>
							답장
						</button>
						<button className={style.msg_delete_reply} onClick={onDeleteMessage}>
							삭제
						</button>
					</div>
				</div>
			) : (
				<div className={style.msg_detail_to}>
					<div className={style.msg_detail_header}>
						<span className={style.p_title}>받는 사람 : </span>
						<span className={style.p_content}> {messageDetail.receiver_username}</span>
						<button className={style.msg_delete} onClick={onDeleteMessage}>
							삭제
						</button>
					</div>

					<br />
				</div>
			)}

			<div className={style.msg_detail_date}>
				<span className={style.p_title}>날짜 : </span>
				<span className={style.p_content}> {messageDetail.send_at.substring(0, 10)}</span>
				<br />
			</div>
			<div className={style.msg_detail_container}>
				<span className={style.p_title}>제목 : </span>
				<span className={style.p_content}> {messageDetail.title}</span>
				<br />
				<span className={style.p_content}> {messageDetail.content}</span>
			</div>
		</div>
	);
}

export default ReadMessageDeatil;
