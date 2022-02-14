import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { adminPagination, pageDown, pageUp } from "utils/adminFunction";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function AdminReportArticleList() {
	const [reportArticles, setReportArticles] = useState({
		totalReports: "",
		id: "",
		title: "",
		username: "",
	});
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(0);

	useEffect(() => {
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/admin/articles/reports?page=${page}&size=10`,
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
		<>
			<table>
				<thead>
					<tr>
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
								<td>{reportArticle.totalReports}</td>
								<td>{reportArticle.title}</td>
								<td>{reportArticle.username}</td>
								<td>
									<Link to="report-article-detail" state={{ articleId: reportArticle.id }}>
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
				<div>
					<button onClick={() => pageDown(page, pageSize, setPage)}>&lt;</button>
					{adminPagination(pageSize, setPage)}
					<button onClick={() => pageUp(page, pageSize, setPage)}>&gt;</button>
				</div>
			) : null}
		</>
	);
}

export default AdminReportArticleList;
