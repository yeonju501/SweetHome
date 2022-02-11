import axios from "axios";
import React from "react";
import { useEffect } from "react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function AdminBoardList() {
	useEffect(() => {
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/boards`,
		})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<>
			<h1>게시판 목록</h1>
		</>
	);
}

export default AdminBoardList;
