import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { adminPagination, pageDown, pageUp } from "utils/adminFunction";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function AdminBoardList() {
	const [boardList, setBoardList] = useState({
		id: "",
		name: "",
		description: "",
	});
	const user = useSelector((state) => state.userInfo.apt_house);
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(0);

	useEffect(() => {
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/apts/${user.apt.apt_id}/boards?page=${page}&size=10`,
		})
			.then((res) => {
				setBoardList(res.data);
				setPageSize(res.data.total_page_count);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [page]);

	const onDelete = (e) => {
		const id = e.target.id;
		axios({
			method: "DELETE",
			url: `${SERVER_URL}/api/admin/boards/${id}`,
		}).catch((err) => {
			console.log(err);
		});
	};

	return (
		<>
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
								<td>
									<Link to="board-update" state={{ board: board }}>
										수정
									</Link>
								</td>
								<td>
									<button id={board.id} onClick={onDelete}>
										삭제
									</button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="4">게시판이 없습니다</td>
						</tr>
					)}
				</tbody>
			</table>
			{boardList.length > 0 ? (
				<div>
					<button onClick={() => pageDown(page, pageSize, setPage)}>&lt;</button>
					{adminPagination(pageSize, setPage)}
					<button onClick={() => pageUp(page, pageSize, setPage)}>&gt;</button>
				</div>
			) : null}
		</>
	);
}

export default AdminBoardList;
