import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function AdminReportCommentDetail() {
	const location = useLocation();
	const user = useSelector((state) => state.userInfo.apt_house);

	const commentId = location.state.commentId;
	const [reportComments, setReportComments] = useState([]);

	const [commentDetail, setCommentDetail] = useState({
		id: location.state.commentId,
		content: location.state.content,
		username: location.state.username,
		totalReports: location.state.totalReports,
	});

	function getReportCommentDetail(id) {
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/apts/${user.apt.apt_id}/admin/comments/${id}/reports`,
		})
			.then((res) => {
				console.log(res.data);
				setReportComments(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	useEffect(() => {
		getReportCommentDetail(location.state.commentId);
	}, []);

	const onApprove = () => {
		axios({
			method: "POST",
			url: `${SERVER_URL}/api/apts/${user.apt.apt_id}/admin/comments/${commentId}/reports`,
		}).catch((err) => {
			console.log(err);
		});
	};

	const onReject = () => {
		axios({
			method: "DELETE",
			url: `${SERVER_URL}/api/apts/${user.apt.apt_id}/admin/comments/${commentId}/reports`,
		}).catch((err) => {
			console.log(err);
		});
	};
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
									<td>
										<button onClick={onApprove}>승인</button>
									</td>
									<td>
										<button onClick={onReject}>거부</button>
									</td>
								</tr>
						  ))
						: null}
				</tbody>
			</table>
		</>
	);
}

export default AdminReportCommentDetail;
