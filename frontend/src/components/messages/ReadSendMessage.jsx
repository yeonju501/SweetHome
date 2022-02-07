import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import tableStyle from "../../style/ProfileComments.module.css";
import messageStyle from "../../style/Messages.module.css";
import paginationStyle from "../../style/Pagination.module.css";
import { getMessagesFromServer, messagePagination } from "../../utils/messagesFunction";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ReadSendMessage() {
	const [sendMessageArray, setSendMessageArray] = useState([]);
	const [page, setPage] = useState(0);
	const size = 10;
	const [checkItems, setCheckITems] = useState([]);
	const [pageSize, setPageSize] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		getMessagesFromServer("send", page, size, setSendMessageArray, setPageSize);
	}, [page]);

	const pageUp = () => {
		if (page + 1 >= pageSize) {
			alert("마지막 페이지 입니다");
		} else {
			setPage(page + 1);
		}
	};

	const pageDown = () => {
		if (page === 0) {
			alert("처음 페이지 입니다");
		} else {
			setPage(page - 1);
		}
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
			url: `${SERVER_URL}/api/messages/send`,
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
		<div className={messageStyle.message_container}>
			<h1>ReadSendMessage</h1>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>제목</th>
						<th>받는 사람</th>
						<th>보낸 날짜</th>
						<button className={messageStyle.delete} onClick={onDeleteMessages}>
							삭제
						</button>
					</tr>
				</thead>
				{sendMessageArray.length > 0 ? (
					sendMessageArray.map((sendMessage, idx) => (
						<tr key={idx}>
							<td className={tableStyle.check}>
								<input
									className={tableStyle.check_box}
									type="checkbox"
									onChange={(e) => {
										changeHandler(e.currentTarget.checked, sendMessage.message_id);
									}}
									checked={checkItems.includes(sendMessage.message_id) ? true : false}
								/>
							</td>

							<td>
								<Link
									className={tableStyle.article_title}
									to="message-detail"
									state={{ messageId: sendMessage.message_id, position: "send" }}
								>
									{sendMessage.title}
								</Link>
							</td>
							<td>{sendMessage.receiver_username}</td>
							<td>{sendMessage.send_at.substring(0, 10)}</td>
							<td>{sendMessage.read_at === null ? "안읽음" : "읽음"}</td>
						</tr>
					))
				) : (
					<tr>
						<td colSpan="5" className={tableStyle.nothing}>
							받은 메시지가 없습니다
						</td>
					</tr>
				)}
			</table>
			{sendMessageArray.length > 0 ? (
				<div>
					<button className={paginationStyle.btn_pagination} onClick={pageDown}>
						&lt;
					</button>
					{messagePagination(pageSize, setPage)}
					<button className={paginationStyle.btn_pagination} onClick={pageUp}>
						&gt;
					</button>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}

export default ReadSendMessage;
