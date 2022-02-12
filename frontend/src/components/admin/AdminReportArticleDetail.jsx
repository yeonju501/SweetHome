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

	return;
}

export default AdminReportArticleDetail;
