import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import style from "../../style/Messages.module.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function SendMessage() {
	const navigate = useNavigate();

	const [sendMessage, setSendMessage] = useState({
		receiver_name: "",
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
			}).then((res) => {
				toast.success("메시지 전송 완료");
				setSendMessage({ receiver_name: "", title: "", content: "" });
				console.log(res);
			});
		}
		console.log(e.target.checkValidity());
	}

	function onCancel() {
		navigate("/message-box");
	}

	const { receiver_name, title, content } = sendMessage;
	return (
		<div className={style.message_container}>
			<h1>SendMessage</h1>
			<form className={style.form} onSubmit={onSend}>
				<p className={style.input_p}>받는 사람</p>
				<input
					autoFocus="autofocus"
					className={style.input_box}
					type="text"
					id="receiver_name"
					value={receiver_name}
					onChange={onChange}
					required
				/>
				<p className={style.input_p}>제목</p>
				<input
					className={style.input_box}
					type="text"
					id="title"
					value={title}
					onChange={onChange}
					required
				/>
				<p className={style.input_p}>내용</p>
				<input
					className={style.input_box}
					type="text"
					id="content"
					value={content}
					onChange={onChange}
					required
				/>
				<div className={style.btn_container}>
					<button className={style.send}>Send</button>
					<button className={style.delete} onClick={onCancel}>
						Cancle
					</button>
				</div>
			</form>
		</div>
	);
}

export default SendMessage;
