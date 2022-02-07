import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as axiosRequest from "../../utils/profileAxios";
import style from "../../style/ProfileComments.module.css";
import ProfilePagination from "./ProfilePagination";
function ProfileArticles() {
	const [data, setData] = useState({ articles: [], totalPage: 0, currentPage: 0 });
	const { articles, totalPage, currentPage } = data;

	useEffect(() => {
		axiosRequest.GETMYARTICLES(setData, "boards/articles/mine", currentPage);
	}, [currentPage]);

	return (
		<>
			<table>
				<thead>
					<tr>
						<th colSpan="2" className={style.table_board_name}>
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
									<input type="checkbox" className={style.check_box} />
								</td>
								<td>{article.board_name}</td>
								<td>
									<Link
										to={`/articles/${article.article_id}`}
										state={{ id: article.article_id }}
										className={style.article_title}
									>
										{article.title}
									</Link>
								</td>
								<td>{article.created_at.slice(0, 10)}</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="5" className={style.nothing}>
								아직 작성한 글이 없습니다
							</td>
						</tr>
					)}
				</tbody>
			</table>
			<footer>
				<ProfilePagination page={currentPage} total={totalPage} setData={setData} />
			</footer>
		</>
	);
}

export default ProfileArticles;
