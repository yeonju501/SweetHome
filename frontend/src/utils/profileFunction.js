import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
export function GETUSERINFO(func) {
	axios({
		url: `${SERVER_URL}/api/members/my-profile`,
		method: "get",
	}).then((res) => {
		func(res.data);
	});
}

export function GETDATA(address, func, which) {
	axios({
		url: `${SERVER_URL}/api/${address}`,
		method: "get",
	}).then((res) => {
		func(res.data[which]);
	});
}
