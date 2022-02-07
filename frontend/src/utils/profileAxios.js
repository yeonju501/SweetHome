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

export function GETDATA(address, func1, page) {
	axios({
		url: `${SERVER_URL}/api/${address}/?page=${page}`,
		method: "get",
	}).then((res) => {
		console.log(res.data);
		func1((prev) => ({
			...prev,
			comments: res.data.comments,
			totalPage: res.data.total_page_count,
			currentPage: res.data.current_page_count,
		}));
	});
}
