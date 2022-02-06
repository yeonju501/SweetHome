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
