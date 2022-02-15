import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import msgStyle from "style/Messages.module.css";
import adminStyle from "style/Admin.module.css";
import pagStyle from "style/Pagination.module.css";
import { adminPagination, pageDown, pageUp } from "utils/adminFunction";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function AdminBoardRequestList() {
	const [boardRequestList, setBoardRequestList] = useState({
		id: "",
		name: "",
		description: "",
	});
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(0);

	useEffect(() => {
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/admin/boards?page=${page}&size=10`,
		})
			.then((res) => {
				setBoardRequestList(res.data.boards);
				setPageSize(res.data.total_page_count);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [page]);

	const approveBoard = (method, id) => {
		axios({
			method,
			url: `${SERVER_URL}/api/admin/boards/${id}/approve`,
		}).catch((err) => {
			console.log(err);
		});
	};
	return (
		<div className={adminStyle.div_container}>
			<table>
				<thead>
					<tr>
						<th>순서</th>
						<th>신청자</th>
						<th>내용</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{boardRequestList.length > 0 ? (
						boardRequestList.map((boardRequest, idx) => (
							<tr key={idx}>
								<td>{idx + 1}</td>
								<td>{boardRequest.name}</td>
								<td>{boardRequest.description}</td>
								<button
									className={msgStyle.send}
									onClick={(e) => {
										approveBoard("POST", boardRequest.id);
									}}
								>
									승인
								</button>
								<button
									className={msgStyle.delete}
									onClick={(e) => {
										approveBoard("DELETE", boardRequest.id);
									}}
								>
									거절
								</button>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="4">신청 게시판이 없습니다</td>
						</tr>
					)}
				</tbody>
			</table>
			{boardRequestList.length > 0 ? (
				<div className={pagStyle.pagination}>
					<button
						className={pagStyle.btn_pagination}
						onClick={() => pageDown(page, pageSize, setPage)}
					>
						&lt;
					</button>
					{adminPagination(pageSize, setPage)}
					<button
						className={pagStyle.btn_pagination}
						onClick={() => pageUp(page, pageSize, setPage)}
					>
						&gt;
					</button>
				</div>
			) : null}
		</div>
	);
}

export default AdminBoardRequestList;
