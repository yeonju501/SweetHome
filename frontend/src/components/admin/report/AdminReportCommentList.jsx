import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function AdminReportCommentList() {
	const [reportComments, setReportComments] = useState({
		totalReports: "",
		id: "",
		content: "",
		username: "",
		created_at: "",
	});

	useEffect(() => {
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/admin/comments/reports`,
		})
			.then((res) => {
				console.log("히얼", res.data.blocked_comments);
				setReportComments(res.data.blocked_comments);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>신고횟수</th>
						<th>내용</th>
						<th>작성자</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{reportComments.length > 0 ? (
						reportComments.map((reportComment, idx) => (
							<tr key={idx}>
								<td>{reportComment.totalReports}</td>
								<td>{reportComment.content}</td>
								<td>{reportComment.username}</td>
								<td>
									<Link
										to="report-comment-detail"
										state={{
											commentId: reportComment.id,
											content: reportComment.content,
											username: reportComment.username,
											totalReports: reportComment.totalReports,
										}}
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
		</div>
	);
}

export default AdminReportCommentList;
