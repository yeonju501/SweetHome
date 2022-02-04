import axios from "axios";

export default function profileFunction(address, func) {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;

	axios({
		url: `${SERVER_URL}/api/${address}`,
		method: "get",
	}).then((res) => {
		func(res.data);
	});
}
