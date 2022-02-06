import { useEffect, useState } from "react";
import * as axiosRequest from "../../utils/profileFunction";
import style from "../../style/ProfileComments.module.css";
import { Link } from "react-router-dom";
function ProfileLikes() {
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		axiosRequest.GETDATA("articles/likes/mine", setArticles, "articles");
	}, []);

	return (
		<table>
			<thead>
				<tr>
					<th colSpan="2" className={style.tabel_board_name}>
						게시판 이름
					</th>
					<th>제목</th>
					<th>작성 날짜</th>
				</tr>
			</thead>
			<tbody>
				{articles.length > 0 ? (
					articles.map((article, idx) => (
						<tr key={idx}>
							<td className={style.check}>
								<label htmlFor="">
									<input type="checkbox" className={style.check_box} />
								</label>
							</td>
							<td>{article.board_name}</td>

							<td>
								<Link to={`/articles/${article.article_id}`} state={{ id: article.article_id }}>
									{article.title}
								</Link>
							</td>
							<td>{article.created_at.slice(0, 10)}</td>
						</tr>
					))
				) : (
					<tr>
						<td>아직 좋아요한 게시글이 없습니다</td>
					</tr>
				)}
			</tbody>
		</table>
	);
}

export default ProfileLikes;
