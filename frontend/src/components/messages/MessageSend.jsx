import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "style/Messages.module.css";
import errorMessage from "store/errorMessage";

function SendMessage({ target }) {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const navigate = useNavigate();

	useEffect(() => {
		if (target) {
			setSendMessage({ ...sendMessage, receiver_name: target });
		}
	}, []);
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
		if ((receiver_name.trim() || target) && title.trim() && content.trim()) {
			axios({
				method: "POST",
				url: `${SERVER_URL}/api/messages/`,
				data: sendMessage,
			})
				.then(() => {
					alert("메시지 전송 완료");
					setSendMessage({ receiver_name: "", title: "", content: "" });
				})
				.then(() => {
					if (target) {
						window.close();
					}
				})
				.catch((err) => {
					errorMessage(err.response.data.error_code);
				});
		} else {
			alert("받는 사람과 제목, 내용을 모두 입력하세요");
		}
	}

	function onCancel() {
		if (target) {
			window.close();
		}
		navigate("/message-box");
	}

	const { receiver_name, title, content } = sendMessage;

	return (
		<div className={style.send_message}>
			<h1>쪽지 쓰기</h1>
			<form className={style.send_form}>
				<div className={style.message_to}>
					<label className={style.label}>받는 사람</label>
					{target ? (
						<input className={style.input_box} type="text" value={target} readOnly />
					) : (
						<input
							autoFocus="autofocus"
							className={style.input_box}
							type="text"
							id="receiver_name"
							value={receiver_name}
							onChange={onChange}
							required
						/>
					)}
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

				<textarea
					className={style.writing_area}
					id="content"
					value={content}
					onChange={onChange}
					required
				></textarea>
				<div className={style.btn_container}>
					<button className={style.btn_send} onClick={onSend}>
						전송
					</button>
					<button className={style.btn_delete} type="button" onClick={onCancel}>
						취소
					</button>
				</div>
			</form>
		</div>
	);
}

export default SendMessage;
