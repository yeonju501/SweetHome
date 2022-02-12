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

	return;
}

export default AdminReportArticleDetail;
