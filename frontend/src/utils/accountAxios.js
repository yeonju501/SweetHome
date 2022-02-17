import axios from "axios";
import errorMessage from "store/errorMessage";
import { onLoginSuccess } from "./manageToken";
import * as inputValid from "utils/inputValid";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
export function submitAxios(api, inputValue, moveUrl, login = false) {
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

export function isThisDuplicte(api, data, setState) {
	if (api === "email") {
		if (!inputValid.emailValid(data.value)) {
			return setState(1);
		}
	}
	axios({
		url: `${SERVER_URL}/api/members/exist-${api}`,
		method: "post",
		headers: { "Content-Type": "application/json" },
		data,
	})
		.then((res) => {
			if (res.data.result) {
				alert("이미 사용중인 닉네임입니다.");
			} else {
				alert("사용 가능한 닉네임입니다");
			}
			res.data.result ? setState(1) : setState(2);
		})
		.catch((err) => errorMessage(err.response.data.error_code));
}
