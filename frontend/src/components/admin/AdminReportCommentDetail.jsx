import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function AdminReportCommentDetail() {
	const location = useLocation();
	const [reportComments, setReportComments] = useState({
		id: "",
		username: "",
		content: "",
		created_at: "",
		totalReports: "",
	});

	const [commentDetail, setCommentDetail] = useState({
		id: location.state.commentId,
		content: location.state.content,
		username: location.state.username,
		totalReports: location.state.totalReports,
	});

	return;
}

export default AdminReportCommentDetail;
