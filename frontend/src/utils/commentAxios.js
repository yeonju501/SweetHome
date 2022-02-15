import axios from "axios";

const URL = process.env.REACT_APP_SERVER_URL;

export function commnetAxios(aptId, commentId, method) {
	const response = axios({
		url: `${URL}/api/apts/${aptId}/comments/${commentId}/likes`,
		method: method,
	});
	return response;
}

export function deleteOrSubmit(aptId, commentId, method, data = "") {
	const response = axios({
		url: `${URL}/api/apts/${aptId}/articles/comments/${commentId}`,
		method,
		headers: { "Content-Type": "application/json" },
		data,
	});
	return response;
}
