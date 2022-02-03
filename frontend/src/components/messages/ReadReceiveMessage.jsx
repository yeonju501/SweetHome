import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ReadReceiveMessage() {
	const token = useSelector((state) => state.token.accessToken);
	const [receiveMessageArray, setReceiveMessageArray] = useState([]);
	const [page, setPage] = useState(0);
	const size = 10;
	const [checkItems, setCheckITems] = useState([]);

	useEffect(() => {
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/messages/receive?page=${page}&size=${size}`,
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((res) => {
				setReceiveMessageArray(res.data);
				console.log(res.data);
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
			url: `${SERVER_URL}/api/messages/`,
			headers: { Authorization: `Bearer ${token}` },
			data: {
				message_ids: temp,
			},
		}).then((res) => {
			console.log(res);
		});
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
			<button onClick={pageDown}>이전</button>
			<button onClick={pageUp}>다음</button>
		</div>
	);
}

export default ReadReceiveMessage;
