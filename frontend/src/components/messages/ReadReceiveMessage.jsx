import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import style from "../../style/Messages.module.css";
import { getMessagesFromServer, messagePagination } from "../../utils/messagesFunction";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ReadReceiveMessage() {
	const [receiveMessageArray, setReceiveMessageArray] = useState([]);
	const [page, setPage] = useState(0);
	const size = 10;
	const [checkItems, setCheckITems] = useState([]);
	const [pageSize, setPageSize] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		getMessagesFromServer("receive", page, size, setReceiveMessageArray, setPageSize);
	}, [page]);

	const pageUp = () => {
		setPage(page + 1);
	};

	const pageDown = () => {
		setPage(page - 1);
	};

	const changeHandler = (checked, id) => {
		if (checked) {
			setCheckITems([...checkItems, id]);
		} else {
			setCheckITems(checkItems.filter((el) => el !== id));
		}
	};

	function onDeleteMessages(e) {
		const temp = checkItems;
		e.preventDefault();
		axios({
			method: "DELETE",
			url: `${SERVER_URL}/api/messages/receive`,
			data: {
				message_ids: temp,
			},
		}).then((res) => {
			toast.success("메시지 삭제 완료");
			navigate("/message-box");
			console.log(res);
		});
	}

	return (
		<div>
			<h1>ReadReciveMessage</h1>

			<table>
				<th></th>
				<th>제목</th>
				<th>받는 사람</th>
				<th>보낸 날짜</th>
				<button className={style.delete} onClick={onDeleteMessages}>
					삭제
				</button>
				{receiveMessageArray.map((receiveMessage, idx) => (
					<tr key={idx}>
						<td>
							<input
								type="checkbox"
								onChange={(e) => {
									changeHandler(e.currentTarget.checked, receiveMessage.message_id);
								}}
								checked={checkItems.includes(receiveMessage.message_id) ? true : false}
							/>
						</td>

						<td>
							<Link
								to="/message-box/message-detail"
								state={{ messageId: receiveMessage.message_id }}
							>
								{receiveMessage.title}
							</Link>
						</td>
						<td>{receiveMessage.receiver_username}</td>
						<td>{receiveMessage.send_at.substring(0, 10)}</td>
					</tr>
				))}
			</table>
			<div>
				<button className={style.button} onClick={pageDown}>
					이전
				</button>
				{messagePagination(pageSize, setPage)}
				<button className={style.button} onClick={pageUp}>
					다음
				</button>
			</div>
		</div>
	);
}

export default ReadReceiveMessage;
