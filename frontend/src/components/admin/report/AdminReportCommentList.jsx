import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import adminStyle from "style/Admin.module.css";
import pagStyle from "style/Pagination.module.css";
import { adminPagination, pageDown, pageUp } from "utils/adminFunction";
import { useSelector } from "react-redux";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function AdminReportCommentList() {
	const user = useSelector((state) => state.userInfo.apt_house);

	const [reportComments, setReportComments] = useState({
		totalReports: "",
		id: "",
		content: "",
		username: "",
		created_at: "",
	});
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(0);

	useEffect(() => {
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/apts/${user.apt.apt_id}/admin/comments/reports?page=${page}&size=10`,
		})
			.then((res) => {
				setReportComments(res.data.blocked_comments);
				setPageSize(res.data.total_page_count);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [page]);
	return (
		<div className={adminStyle.div_container}>
			<table>
				<thead>
					<tr>
						<th>순서</th>
						<th>신고횟수</th>
						<th>내용</th>
						<th>작성자</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{reportComments.length > 0 ? (
						reportComments.map((reportComment, idx) => (
							<tr key={idx}>
								<td>{idx + 1}</td>
								<td>{reportComment.totalReports}</td>
								<td>{reportComment.content}</td>
								<td>{reportComment.username}</td>
								<td>
									<Link
										to="report-comment-detail"
										state={{
											commentId: reportComment.id,
											content: reportComment.content,
											username: reportComment.username,
											totalReports: reportComment.totalReports,
										}}
										style={{ fontWeight: "800" }}
									>
										자세히보기
									</Link>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="4">신고 댓글이 없습니다</td>
						</tr>
					)}
				</tbody>
			</table>
			{reportComments.length > 0 ? (
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

export default AdminReportCommentList;
