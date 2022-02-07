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

export function GETMYCOMMENTS(func1, page) {
	axios({
		url: `${SERVER_URL}/api/articles/comments/mine/?page=${page}`,
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

export function GETMYARTICLES(address, func1, page) {
	axios({
		url: `${SERVER_URL}/api/${address}/?page=${page}`,
		method: "get",
	}).then((res) => {
		console.log(res.data);
		func1((prev) => ({
			...prev,
			articles: res.data.articles,
			totalPage: res.data.total_page_count,
			currentPage: res.data.current_page_count,
		}));
	});
}
export function GETMYLIKES(address, func1, page) {
	axios({
		url: `${SERVER_URL}/api/${address}/?page=${page}`,
		method: "get",
	}).then((res) => {
		console.log(res.data);
		func1((prev) => ({
			...prev,
			likes: res.data.likes,
			totalPage: res.data.total_page_count,
			currentPage: res.data.current_page_count,
		}));
	});
}
