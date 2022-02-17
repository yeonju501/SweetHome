import { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentsList from "./CommentsList";
import style from "style/articles/ArticleDetailComment.module.css";
import { useSelector } from "react-redux";
import ProfilePagination from "components/profile/ProfilePagination";

function Comments({ articleId, setComment, getTotalComments }) {
	const URL = process.env.REACT_APP_SERVER_URL;
	const [comments, setComments] = useState([]);
	const user = useSelector((state) => state.userInfo.apt_house);
	const [data, setData] = useState({ totalPage: 0, currentPage: 0 });
	const { totalPage, currentPage } = data;

	const getMoreComments = () => {
		try {
			axios({
				url: `${URL}/api/apts/${user.apt.apt_id}/articles/${articleId}/comments?page=${currentPage}&size=10`,
				method: "get",
			}).then((res) => {
				setData({ ...data, totalPage: res.data.total_page_count });
				setComments(res.data.comments);
				setComment(res.data.comments.length);
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getMoreComments();
	}, [currentPage]);

	return (
		<div>
			<CommentCreate
				articleId={articleId}
				getComments={getMoreComments}
				getTotalComments={getTotalComments}
			/>
			{comments.length > 0 ? (
				<div className={style.comments}>
					<CommentsList
						articleId={articleId}
						comments={comments}
						getComments={getMoreComments}
						getTotalComments={getTotalComments}
					/>
					{comments.length > 0 && (
						<footer className={style.pagination}>
							<ProfilePagination page={currentPage} total={totalPage} setData={setData} />
						</footer>
					)}
				</div>
			) : (
				<p className={style.no_comments}>작성된 댓글이 없습니다</p>
			)}
		</div>
	);
}

export default Comments;
