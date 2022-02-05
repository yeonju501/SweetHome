import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ReadReceiveMessage() {
	const token = useSelector((state) => state.token.accessToken);
	const [receiveMessageArray, setReceiveMessageArray] = useState([]);
	const [page, setPage] = useState(0);
	const size = 10;
	const [checkItems, setCheckITems] = useState([]);
	const [pageSize, setPageSize] = useState(0);

	useEffect(() => {
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/messages/receive?page=${page}&size=${size}`,
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((res) => {
				setReceiveMessageArray(res.data);
				setPageSize(res.data.total_page_count);
				console.log(res.data.messages);
				console.log("저장된 값 확인", receiveMessageArray);
			})
			.catch((err) => {
				console.log(err);
			});
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
			headers: { Authorization: `Bearer ${token}` },
			data: {
				message_ids: temp,
			},
		}).then((res) => {
			toast.success("메시지 삭제 완료");
			console.log(res);
		});
	}

	function messagePagination() {
		let tempSize = [];
		for (let i = 0; i < pageSize; i++) {
			tempSize.push(<button onClick={changePage}>{i + 1}</button>);
		}

		return tempSize;
	}

	function changePage(e) {
		console.log("체인지페이지", e.target.innerText);
		const chosePage = Number(e.target.innerText) - 1;
		setPage(chosePage);
	}

	return (
		<div>
			<h1>ReadReciveMessage</h1>
			<button onClick={onDeleteMessages}>삭제</button>
			<ul>
				{receiveMessageArray.map((receiveMessage, idx) => (
					<li key={idx}>
						<input
							type="checkbox"
							onChange={(e) => {
								changeHandler(e.currentTarget.checked, receiveMessage.message_id);
							}}
							checked={checkItems.includes(receiveMessage.message_id) ? true : false}
						/>
						<Link to="/message-box/message-detail" state={{ messageId: receiveMessage.message_id }}>
							{receiveMessage.message_id}
						</Link>
					</li>
				))}
			</ul>
			<div>
				<button onClick={pageDown}>이전</button>
				{messagePagination()}
				<button onClick={pageUp}>다음</button>
			</div>
		</div>
	);
}

export default ReadReceiveMessage;
