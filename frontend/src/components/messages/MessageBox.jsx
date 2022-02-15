import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import tableStyle from "style/ProfileComments.module.css";
import messageStyle from "style/Messages.module.css";
import { getMessagesFromServer } from "utils/messagesFunction";
import ProfilePagination from "components/profile/ProfilePagination";

function MessageBox(props) {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const [messages, setMessages] = useState([]);
	const [page, setPage] = useState(0);
	const [checkItems, setCheckITems] = useState([]);
	const [pageSize, setPageSize] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		getMessagesFromServer(props.action, page, setMessages, setPageSize);
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
			url: `${SERVER_URL}/api/messages/${props.action}`,
			data: {
				message_ids: temp,
			},
		}).then(() => {
			toast.success("메시지 삭제 완료");
			navigate("/");
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
					{messages.length > 0 ? (
						messages.map((message, idx) => (
							<tr key={idx}>
								<td className={tableStyle.check}>
									<input
										className={tableStyle.check_box}
										type="checkbox"
										onChange={(e) => {
											changeHandler(e.currentTarget.checked, message.message_id);
										}}
										checked={checkItems.includes(message.message_id) ? true : false}
									/>
								</td>

								<td>
									<Link
										className={tableStyle.article_title}
										to="message-detail"
										state={{ messageId: message.message_id, position: "send" }}
									>
										{message.title}
									</Link>
								</td>
								<td>{message.receiver_username}</td>
								<td>{message.send_at.substring(0, 10)}</td>
								<td>{message.read_at === null ? "안읽음" : "읽음"}</td>
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
			{messages.length > 0 && (
				<ProfilePagination total={pageSize} page={page} setData={setMessages} />
			)}
		</div>
	);
}

export default MessageBox;
