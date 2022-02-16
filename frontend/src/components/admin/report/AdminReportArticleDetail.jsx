import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "style/Admin.module.css";

function AdminReportArticleDetail() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const user = useSelector((state) => state.userInfo.apt_house);
	const location = useLocation();
	const navigate = useNavigate();
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
			url: `${SERVER_URL}/api/apts/${user.apt.apt_id}/admin/articles/${articleId}/reports`,
		}).then(() => navigate("/report-manage"));
	};

	const onReject = () => {
		axios({
			method: "DELETE",
			url: `${SERVER_URL}/api/apts/${user.apt.apt_id}/admin/articles/${articleId}/reports`,
		})
			.then(() => navigate("/report-manage"))
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<section className={style.admin_report}>
			<article className={style.info_report_article}>
				<button className={style.admin_report_btns} onClick={onApprove}>
					블락
				</button>
				<button className={style.admin_report_decline} onClick={onReject}>
					해제
				</button>
			</article>
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
								</tr>
						  ))
						: null}
				</tbody>
			</table>
		</section>
	);
}

export default AdminReportArticleDetail;
