import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function AdminReportArticleList() {
	const [reportArticles, setReportArticles] = useState({
		totalReports: "",
		id: "",
		title: "",
		username: "",
	});
	useEffect(() => {
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/admin/articles/reports`,
		})
			.then((res) => {
				console.log(res.data);
				setReportArticles(res.data.articles);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<table>
			<thead>
				<tr>
					<th>신고횟수</th>
					<th>제목</th>
					<th>작성자</th>
				</tr>
			</thead>
			<tbody>
				{reportArticles.length > 0 ? (
					reportArticles.map((reportArticle, idx) => (
						<tr key={idx}>
							<td>{reportArticle.totalReports}</td>
							<td>{reportArticle.title}</td>
							<td>{reportArticle.username}</td>
						</tr>
					))
				) : (
					<tr>
						<td colSpan="3">신고 게시글이 없습니다</td>
					</tr>
				)}
			</tbody>
		</table>
	);
}

export default AdminReportArticleList;
