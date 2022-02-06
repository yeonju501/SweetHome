import { useEffect, useState } from "react";
import * as axiosRequest from "../../utils/profileFunction";

function ProfileLikes() {
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		axiosRequest.GETDATA("articles/likes/mine", setArticles, "likes");
	}, []);

	return (
		<table>
			<thead>
				<tr>
					<th colSpan="2" className={style.tabel_board_name}>
						게시판 이름
					</th>
					<th>제목</th>
					<th>댓글 내용</th>
					<th>작성 날짜</th>
				</tr>
			</thead>
			<tbody>
				{articles.length > 0 ? (
					articles.map((article, idx) => (
						<tr key={idx}>
							<td className={style.check}>
								<input type="checkbox" className={style.check_box} />
							</td>
							<td>{article.board_name}</td>
							<td>{article.article_title}</td>
							<td>{article.content}</td>
							<td>{article.created_at.slice(0, 10)}</td>
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

export default ProfileLikes;
