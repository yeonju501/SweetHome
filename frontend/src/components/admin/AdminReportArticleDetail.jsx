import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function AdminReportArticleDetail() {
	const location = useLocation();
	const articleId = location.state.articleId;
	const [reportArticles, setReportArticles] = useState({
		report_id: "",
		report_username: "",
		content: "",
	});
	const [articleDetail, setArticleDetail] = useState({
		title: "",
		email: "",
		username: "",
		content: "",
		created_at: "",
		updated_at: "",
		total_likes: "",
		total_reports: "",
	});

	function getReportArticleDetail(id) {
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/admin/articles/${id}/reports`,
		})
			.then((res) => {
				console.log(res.data);
				setReportArticles(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function getArticleDetail(id) {
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/boards/articles/${id}`,
		})
			.then((res) => {
				console.log(res.data);
				setArticleDetail(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}
	useEffect(() => {
		console.log(location.state.articleId);
		getReportArticleDetail(articleId);
		getArticleDetail(articleId);
		console.log(reportArticles);
		console.log(articleDetail);
	}, []);

	const onApprove = () => {
		axios({
			method: "POST",
			url: `${SERVER_URL}/api/admin/articles/${articleId}/reports`,
		})
			.then((res) => {
				console.log("성공");
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div>
			<h1>
				신고 게시글 : {articleDetail.title} 신고 횟수 : {articleDetail.total_reports}
			</h1>
			<h2>작성자 : {articleDetail.username}</h2>
			<h2>내용 : {articleDetail.content}</h2>
			<table>
				<thead>
					<tr>
						<td>신고자</td>
						<td>신고 내용</td>
						<td></td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					{reportArticles.map((reportArticle, idx) => (
						<tr key={idx}>
							<td>{reportArticle.report_username}</td>
							<td>{reportArticle.content}</td>
							<button onClick={onApprove}>승인</button>
							<button>거부</button>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default AdminReportArticleDetail;
