import axios from "axios";

const URL = process.env.REACT_APP_SERVER_URL;

export function cancelOrRefer(method, Func, True, False) {
	axios({
		url: `${URL}/api/apts/register`,
		method,
		headers: { "Content-type": "application/json;charset=UTF-8" },
	})
		.then(() => Func(True))
		.catch(() => Func(False));
	// window.location.replace("/");
}
