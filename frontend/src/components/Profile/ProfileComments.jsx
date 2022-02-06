import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as axiosRequest from "../../utils/profileFunction";
import style from "../../style/ProfileComments.module.css";

function ProfileComments() {
	const [comments, setComments] = useState([]);

	useEffect(() => {
		axiosRequest.GETDATA("articles/comments/mine", setComments, "comments");
	}, []);

	return (
		<table>
			<thead>
				<tr>
					<th colSpan="2" className={style.table_board_name}>
						게시판 이름
					</th>
					<th>제목</th>
					<th>댓글 내용</th>
					<th>작성 날짜</th>
				</tr>
			</thead>
			<tbody>
				{comments.length > 0 ? (
					comments.map((comment, idx) => (
						<tr key={idx}>
							<td className={style.check}>
								<input type="checkbox" className={style.check_box} />
							</td>
							<td>{comment.board_name}</td>
							<td>
								<Link
									to={`/articles/${comment.article_id}`}
									state={{ id: comment.article_id }}
									className={style.article_title}
								>
									{comment.article_title}
								</Link>
							</td>
							<td>{comment.content}</td>
							<td>{comment.created_at.slice(0, 10)}</td>
						</tr>
					))
				) : (
					<tr>
						<td>아직 작성한 댓글이 없습니다</td>
					</tr>
				)}
			</tbody>
		</table>
	);
}

export default ProfileComments;
