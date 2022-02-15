import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import tableStyle from "style/ProfileComments.module.css";
import messageStyle from "style/Messages.module.css";
import { getMessagesFromServer } from "utils/messagesFunction";
import ProfilePagination from "components/profile/ProfilePagination";
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
		});
	}

	return (
		<div className={messageStyle.message_container}>
			<button className={messageStyle.delete} onClick={onDeleteMessages}>
				삭제
			</button>
			<table className={messageStyle.table}>
				<thead>
					<tr>
						<th></th>
						<th>제목</th>
						<th>받는 사람</th>
						<th>보낸 날짜</th>
						<th>상태</th>
					</tr>
				</thead>
				<tbody>
					{sendMessageArray.length > 0 ? (
						sendMessageArray.map((sendMessage, idx) => (
							<tr>
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
				</tbody>
			</table>
			{sendMessageArray.length > 0 && (
				<ProfilePagination total={pageSize} page={page} setData={setSendMessageArray} />
			)}
		</div>
	);
}

export default ReadSendMessage;
