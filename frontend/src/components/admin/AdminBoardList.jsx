import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function AdminBoardList() {
	const [boardList, setBoardList] = useState({
		id: "",
		name: "",
		description: "",
	});
	useEffect(() => {
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/boards`,
		})
			.then((res) => {
				console.log(res.data);
				setBoardList(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<table>
			<thead>
				<tr>
					<th>이름</th>
					<th>설명</th>
					<th></th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{boardList.length > 0 ? (
					boardList.map((board, idx) => (
						<tr key={idx}>
							<td>{board.name}</td>
							<td>{board.description}</td>
							<button>수정</button>
							<button>삭제</button>
						</tr>
					))
				) : (
					<tr>
						<td colSpan="4">게시판이 없습니다</td>
					</tr>
				)}
			</tbody>
		</table>
	);
}

export default AdminBoardList;
