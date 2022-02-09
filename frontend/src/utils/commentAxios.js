import axios from "axios";

const URL = process.env.REACT_APP_SERVER_URL;

export function commnetAxios(id, method) {
	const response = axios({
		url: `${URL}/api/comments/${id}/likes`,
		method: method,
	});
	return response;
}

export function deleteOrSubmit(id, method, data = "") {
	const response = axios({
		url: `${URL}/api/articles/comments/${id}`,
		method,
		headers: { "Content-Type": "application/json" },
		data,
	});
	return response;
}
