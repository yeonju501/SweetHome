import { useEffect, useState } from "react";
import profileFunction from "../../utils/profileFunction";

function ProfileComments() {
	const [comments, setComments] = useState("");

	useEffect(() => {
		profileFunction("articles/comments/mine", setComments);
	}, []);

	return (
		<tabel>
			<thead>
				<tr>
					<th>게시판 이름</th>
					<th>제목</th>
					<th>댓글 내용</th>
					<th>작성 날짜</th>
				</tr>
			</thead>
			{comments &&
				comments.map((comment, idx) => (
					<tbody>
						<tr key={idx}>
							<td>{comment.board_name}</td>
							<td>{comment.article_title}</td>
							<td>{comment.content}</td>
							<td>{comment.created_at.slice(0, 10)}</td>
						</tr>
					</tbody>
				))}
		</tabel>
	);
}

export default ProfileComments;
