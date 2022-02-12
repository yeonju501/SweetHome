import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

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

	function getReportCommentDetail(id) {
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/admin/comments/reports`,
		})
			.then((res) => {
				console.log("댓글 신고 목록", res.data.blocked_comments);
				setReportComments(res.data.blocked_comments);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	useEffect(() => {
		console.log(commentDetail);
		getReportCommentDetail(location.state.commentId);
	}, []);
	return (
		<>
			<div>
				<h1>
					신고 게시글 : {commentDetail.title} 신고 횟수 : {commentDetail.totalReports}
				</h1>
				<h2>작성자 : {commentDetail.username}</h2>
				<h2>내용 : {commentDetail.content}</h2>
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
					{reportComments.length > 0
						? reportComments.map((reportComment, idx) => (
								<tr key={idx}>
									<td>{reportComment.username}</td>
									<td>{reportComment.content}</td>
									<button>승인</button>
									<button>거부</button>
								</tr>
						  ))
						: null}
				</tbody>
			</table>
		</>
	);
}

export default AdminReportCommentDetail;
