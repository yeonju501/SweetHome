import { useEffect, useState } from "react";
import profileFunction from "../../utils/profileFunction";
import style from "../../style/ProfileComments.module.css";

function ProfileComments() {
	const [comments, setComments] = useState("");

	useEffect(() => {
		profileFunction("articles/comments/mine", setComments);
	}, []);

	return (
		<table>
			<thead>
				<tr>
					<th></th>
					<th className={style.tabel_board_name}>게시판 이름</th>
					<th>제목</th>
					<th>댓글 내용</th>
					<th>작성 날짜</th>
				</tr>
			</thead>
			{comments &&
				comments.map((comment, idx) => (
					<tbody>
						<tr key={idx}>
							<input type="checkbox" />
							<td>{comment.board_name}</td>
							<td>{comment.article_title}</td>
							<td>{comment.content}</td>
							<td>{comment.created_at.slice(0, 10)}</td>
						</tr>
					</tbody>
				))}
		</table>
	);
}

export default ProfileComments;
