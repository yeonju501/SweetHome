import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminReportArticleDetail() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const user = useSelector((state) => state.userInfo.apt_house);
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
			url: `${SERVER_URL}/api/apts/${user.apt.apt_id}/admin/articles/${id}/reports`,
		})
			.then((res) => {
				setReportArticles(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function getArticleDetail(id) {
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/apts/${user.apt.apt_id}/boards/articles/${id}`,
		})
			.then((res) => {
				setArticleDetail(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}
	useEffect(() => {
		getReportArticleDetail(articleId);
		getArticleDetail(articleId);
	}, []);

	const onApprove = () => {
		axios({
			method: "POST",
			url: `${SERVER_URL}/api/admin/articles/${articleId}/reports`,
		}).catch((err) => {
			console.log(err);
		});
	};

	const onReject = () => {
		axios({
			method: "DELETE",
			url: `${SERVER_URL}/api/admin/articles/${articleId}/reports`,
		}).catch((err) => {
			console.log(err);
		});
	};
	return (
		<>
			<div>
				<h1>
					신고 게시글 : {articleDetail.title} 신고 횟수 : {articleDetail.total_reports}
				</h1>
				<h2>작성자 : {articleDetail.username}</h2>
				<h2>내용 : {articleDetail.content}</h2>
			</div>
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
					{reportArticles.length > 0
						? reportArticles.map((reportArticle, idx) => (
								<tr key={idx}>
									<td>{reportArticle.report_username}</td>
									<td>{reportArticle.content}</td>
									<button onClick={onApprove}>승인</button>
									<button onClick={onReject}>거부</button>
								</tr>
						  ))
						: null}
				</tbody>
			</table>
		</>
	);
}

export default AdminReportArticleDetail;
