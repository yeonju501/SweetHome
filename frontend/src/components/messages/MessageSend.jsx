import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import style from "style/Messages.module.css";
import { useSelector } from "react-redux";

function SendMessage() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const navigate = useNavigate();
	const target = useSelector((state) => state.messageInfo);

	const [sendMessage, setSendMessage] = useState({
		receiver_name: target.username,
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
				data: sendMessage,
			}).then(() => {
				toast.success("메시지 전송 완료");
				setSendMessage({ receiver_name: "", title: "", content: "" });
				target &&
					setTimeout(function () {
						window.close();
					}, 1600);
			});
		}
	}

	function onCancel() {
		target ? window.close() : navigate("/message-box");
	}

	const { receiver_name, title, content } = sendMessage;

	return (
		<div className={style.send_message}>
			<form className={style.send_form}>
				<div className={style.message_to}>
					<label className={style.label}>받는 사람</label>
					<input
						autoFocus="autofocus"
						className={style.input_box}
						type="text"
						id="receiver_name"
						value={receiver_name}
						onChange={onChange}
						required
					/>
				</div>
				<div className={style.message_title}>
					<label className={style.label}>제목</label>
					<input
						className={style.input_box}
						type="text"
						id="title"
						value={title}
						onChange={onChange}
						required
					/>
				</div>

				<input
					type="textarea"
					className={style.writing_area}
					id="content"
					value={content}
					onChange={onChange}
					required
				/>
				<div className={style.btn_container}>
					<button className={style.btn_send} onClick={onSend}>
						Send
					</button>
					<button className={style.btn_delete} onClick={onCancel}>
						Cancle
					</button>
				</div>
			</form>
		</div>
	);
}

export default SendMessage;
