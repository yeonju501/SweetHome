import axios from "axios";
import style from "../style/Messages.module.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export function getMessagesFromServer(api, page, size, funcArray, funcSize) {
	axios({
		method: "GET",
		url: `${SERVER_URL}/api/messages/${api}?page=${page}&size=${size}`,
	})
		.then((res) => {
			funcArray(res.data.messages);
			funcSize(res.data.total_page_count);
		})
		.catch((err) => {
			console.log(err);
		});
}

export function messagePagination(pageSize, setPage) {
	console.log("하이");
	let tempSize = [];
	for (let i = 0; i < pageSize; i++) {
		tempSize.push(
			<button
				className={style.button}
				onClick={(e) => {
					setPage(i);
				}}
			>
				{i + 1}
			</button>,
		);
	}
	return tempSize;
}

export function getDetailMessageFromServer(id, funDetail) {
	axios({
		method: "GET",
		url: `${SERVER_URL}/api/messages/${id}`,
	})
		.then((res) => {
			console.log(res.data);
			funDetail(res.data);
		})
		.catch((err) => {
			console.log(err);
		});
}
