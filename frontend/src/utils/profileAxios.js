import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
export function GETUSERINFO(func1, func2) {
	axios({
		url: `${SERVER_URL}/api/members/my-profile`,
		method: "get",
	}).then((res) => func1(func2(res.data)));
}

export function GETMYCOMMENTS(func1, page, aptId) {
	axios({
		url: `${SERVER_URL}/api/apts/${aptId}/articles/comments/mine?page=${page}`,
		method: "get",
	}).then((res) => {
		func1((prev) => ({
			...prev,
			comments: res.data.comments,
			totalPage: res.data.total_page_count,
			currentPage: res.data.current_page_count,
		}));
	});
}

export function GETMYARTICLES(func1, address, page, aptId) {
	axios({
		url: `${SERVER_URL}/api/apts/${aptId}/${address}?page=${page}`,
		method: "get",
	}).then((res) => {
		func1((prev) => ({
			...prev,
			articles: res.data.articles,
			totalPage: res.data.total_page_count,
			currentPage: res.data.current_page_count,
		}));
	});
}
