import axios from "axios";
import style from "style/Pagination.module.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export function getMessagesFromServer(api, page, funcArray) {
	axios({
		method: "GET",
		url: `${SERVER_URL}/api/messages/${api}?page=${page}&size=10`,
	})
		.then((res) => {
			funcArray(() => ({
				messages: res.data.messages,
				totalPage: res.data.total_page_count,
				currentPage: res.data.current_page_count,
			}));
		})
		.catch((err) => {
			console.log(err);
		});
}

export function messagePagination(pageSize, setPage) {
	let tempSize = [];
	for (let i = 0; i < pageSize; i++) {
		tempSize.push(
			<button
				className={style.btn_pagination}
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
			funDetail(res.data);
		})
		.catch((err) => {
			console.log(err);
		});
}

export function getUnReadMessageCount(funUnRead) {
	axios({
		method: "GET",
		url: `${SERVER_URL}/api/messages/receive/unread-count`,
	})
		.then((res) => {
			funUnRead(res.data);
		})
		.catch((err) => {
			console.log(err);
		});
}

export function getReceiveMessageCount(funcReaceive) {
	axios({
		method: "GET",
		url: `${SERVER_URL}/api/messages/receive/counts`,
	})
		.then((res) => {
			funcReaceive(res.data);
		})
		.catch((err) => {
			console.log(err);
		});
}

export function getSendMessageCount(funcSend) {
	axios({
		method: "GET",
		url: `${SERVER_URL}/api/messages/send/all-count`,
	})
		.then((res) => {
			funcSend(res.data);
		})
		.catch((err) => {
			console.log(err);
		});
}

export function getMessageAllCount(position, funcAll) {
	axios({
		method: "GET",
		url: `${SERVER_URL}/api/messages/${position}/all-count`,
	})
		.then((res) => {
			funcAll(res.data);
		})
		.catch((err) => {
			console.log(err);
		});
}
