import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "style/Admin.module.css";
import pagStyle from "style/Pagination.module.css";
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

	const getList = () => {
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
	};
	useEffect(() => {
		getList();
	}, [page]);

	const onDelete = (e) => {
		const id = e.target.id;
		if (window.confirm("정말로 삭제하시겠습니까?")) {
			axios({
				method: "DELETE",
				url: `${SERVER_URL}/api/admin/boards/${id}`,
			})
				.then(() => getList())
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<div className={style.div_container}>
			<table>
				<thead>
					<tr>
						<th>순서</th>
						<th>이름</th>
						<th>설명</th>
						<th colSpan="2"></th>
					</tr>
				</thead>
				<tbody>
					{boardList.length > 0 ? (
						boardList.map((board, idx) => (
							<tr key={idx}>
								<td>{idx + 1}</td>
								<td>{board.name}</td>
								<td>{board.description}</td>
								<td className={style.admin_board_btn}>
									<Link to="board-update" state={{ board: board }} className={style.update_board}>
										수정
									</Link>
								</td>
								<td className={style.admin_board_btn}>
									<button className={style.admin_mb_decline} id={board.id} onClick={onDelete}>
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

export default AdminBoardList;
