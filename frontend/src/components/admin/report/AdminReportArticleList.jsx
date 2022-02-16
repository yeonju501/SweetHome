import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import adminStyle from "style/Admin.module.css";
import pagStyle from "style/Pagination.module.css";
import { adminPagination, pageDown, pageUp } from "utils/adminFunction";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function AdminReportArticleList() {
	const user = useSelector((state) => state.userInfo.apt_house);
	const [reportArticles, setReportArticles] = useState([]);
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(0);

	useEffect(() => {
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/apts/${user.apt.apt_id}/admin/articles/reports?page=${page}&size=10`,
		})
			.then((res) => {
				setReportArticles(res.data.articles);
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
						<th>제목</th>
						<th>작성자</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{reportArticles.length > 0 ? (
						reportArticles.map((reportArticle, idx) => (
							<tr key={idx}>
								<td>{idx + 1}</td>
								<td>{reportArticle.totalReports}</td>
								<td>{reportArticle.title}</td>
								<td>{reportArticle.username}</td>
								<td>
									<Link
										to="report-article-detail"
										state={{ articleId: reportArticle.id }}
										style={{ fontWeight: "800" }}
									>
										자세히보기
									</Link>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="4">신고 게시글이 없습니다</td>
						</tr>
					)}
				</tbody>
			</table>
			{reportArticles.length > 0 ? (
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

export default AdminReportArticleList;
