import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import style from "style/Admin.module.css";
import ProfilePagination from "components/profile/ProfilePagination";

function AdminBoardRequestList() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const [data, setData] = useState({ boardList: [], totalPage: 0, currentPage: 0 });
	const user = useSelector((state) => state.userInfo.apt_house);
	const { boardList, totalPage, currentPage } = data;

	const getList = () => {
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/apts/${user.apt.apt_id}/admin/boards?page=${currentPage}&size=10`,
		})
			.then((res) => {
				setData({ ...data, boardList: res.data.boards, totalPage: res.data.total_page_count });
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		getList();
	}, [currentPage]);

	const approveBoard = (method, id) => {
		axios({
			method,
			url: `${SERVER_URL}/api/apts/${user.apt.apt_id}/admin/boards/${id}/approve`,
		})
			.then(() => getList())
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div className={style.div_container}>
			<table>
				<thead>
					<tr>
						<th>순서</th>
						<th>신청자</th>
						<th>내용</th>
						<th colSpan="2"></th>
					</tr>
				</thead>
				<tbody>
					{boardList.length > 0 ? (
						boardList.map((boardRequest, idx) => (
							<tr key={idx}>
								<td>{idx + 1}</td>
								<td>{boardRequest.name}</td>
								<td>{boardRequest.description}</td>
								<td className={style.board_request_btns}>
									<button
										className={style.board_request_btn}
										onClick={(e) => {
											approveBoard("POST", boardRequest.id);
										}}
									>
										승인
									</button>
								</td>
								<td className={style.board_request_btns}>
									<button
										className={style.board_request_deline}
										onClick={() => {
											approveBoard("DELETE", boardRequest.id);
										}}
									>
										거절
									</button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="4">신청 게시판이 없습니다</td>
						</tr>
					)}
				</tbody>
			</table>
			{totalPage > 1 ? (
				<ProfilePagination page={currentPage} total={totalPage} setData={setData} />
			) : null}
		</div>
	);
}

export default AdminBoardRequestList;
