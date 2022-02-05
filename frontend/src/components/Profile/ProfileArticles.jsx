import { useEffect, useState } from "react";
import * as axiosRequest from "../../utils/profileFunction";
import style from "../../style/ProfileComments.module.css";

function ProfileArticles() {
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		axiosRequest.GETMYDATA("boards/articles/mine", setArticles, "articles");
	}, []);

	return (
		<table>
			<thead>
				<tr>
					<th colSpan="2">게시판 이름</th>
					<th>제목</th>
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
							<td>{article.title}</td>
							<td>{article.created_at.slice(0, 10)}</td>
						</tr>
					))
				) : (
					<tr>
						<td>아직 작성한 글이 없습니다</td>
					</tr>
				)}
			</tbody>
		</table>
	);
}

export default ProfileArticles;
