import axios from "axios";

const URL = process.env.REACT_APP_SERVER_URL;

export function cancelOrRefer(method, Func) {
	axios({
		url: `${URL}/api/apts/register`,
		method,
		headers: { "Content-type": "application/json;charset=UTF-8" },
	})
		.then((res) => {
			console.log(res);
			if (res.data) return Func(false);
		})
		.catch(() => Func(true));
}

export function hasRequestAptAdmin(Func) {
	axios({
		url: `${URL}/api/apts/apt-manager`,
		method: "get",
		headers: { "Content-type": "application/json;charset=UTF-8" },
	})
		.then((res) => {
			if (res.data) return Func(false);
		})
		.catch(() => Func(true));
}
