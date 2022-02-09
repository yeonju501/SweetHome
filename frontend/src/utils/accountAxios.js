import axios from "axios";
import errorMessage from "../store/errorMessage";
import { onLoginSuccess } from "./manageToken";
export function submitAxios(api, inputValue, moveUrl, login = false) {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	axios({
		method: "post",
		url: `${SERVER_URL}/api/members/${api}`,
		withCredentials: true,
		headers: {
			"Content-type": "application/json",
		},
		data: inputValue,
	})
		.then((res) => {
			login && onLoginSuccess(res);
			window.location.replace(`${moveUrl}`);
		})
		.catch((err) => errorMessage(err.response.data.error_code));
}
