import axios from "axios";

const URL = process.env.REACT_APP_SERVER_URL;

export function hasRequestAptAdmin(method, Func) {
	axios({
		url: `${URL}/api/apts/apt-manager`,
		method,
		headers: { "Content-type": "application/json;charset=UTF-8" },
	})
		.then(() => {
			Func(false);
		})
		.catch(() => {
			Func(true);
		});
}

export function cancelOrRefer(method, Func) {
	axios({
		url: `${URL}/api/apts/register`,
		method,
		headers: { "Content-type": "application/json;charset=UTF-8" },
	})
		.then(() => {
			console.log("000");
			Func(false);
		})
		.catch(() => {
			console.log(hasRequestAptAdmin("get", Func));
		});
}
