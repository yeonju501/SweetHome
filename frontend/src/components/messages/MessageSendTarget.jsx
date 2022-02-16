import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import style from "style/Messages.module.css";
import { useSelector } from "react-redux";

function MessageSendTarget() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
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
		window.close();
	}

	const { receiver_name, title, content } = sendMessage;

	return (
		<div className={style.send_message_target}>
			<h1>쪽지 쓰기</h1>
			<form className={style.send_form_target}>
				<div className={style.message_to_target}>
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
				<div className={style.message_title_target}>
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

				<textarea
					className={style.writing_area_target}
					id="content"
					value={content}
					onChange={onChange}
					required
				></textarea>
				<div className={style.btn_container_target}>
					<button className={style.btn_send} onClick={onSend}>
						전송
					</button>
					<button className={style.btn_delete} onClick={onCancel}>
						취소
					</button>
				</div>
			</form>
		</div>
	);
}

export default MessageSendTarget;
