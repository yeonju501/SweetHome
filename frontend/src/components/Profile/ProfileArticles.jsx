import { useEffect, useState } from "react";
import profileFunction from "../../utils/profileFunction";

function ProfileArticles() {
	const [articles, setArticles] = useState("");

	useEffect(() => {
		profileFunction("boards/articles/mine", setArticles);
	}, []);

	return (
		<tabel>
			<thead>
				<tr>
					<th>제목</th>
					<th>게시판 이름</th>
					<th>작성 날짜</th>
				</tr>
			</thead>
			{articles &&
				articles.map((article, idx) => (
					<tbody>
						<tr key={idx}>
							<td>{article.title}</td>
							<td>{article.board_name}</td>
							<td>{article.created_at.slice(0, 10)}</td>
						</tr>
					</tbody>
				))}
		</tabel>
	);
}

export default ProfileArticles;
