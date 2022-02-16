import { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentsList from "./CommentsList";
import style from "style/articles/ArticleDetailComment.module.css";
import { useSelector } from "react-redux";

function Comments({ articleId, setComment, totalComments, getTotalComments }) {
	const URL = process.env.REACT_APP_SERVER_URL;
	const [comments, setComments] = useState([]);
	const user = useSelector((state) => state.userInfo.apt_house);
	const [page, setPage] = useState(1);
	const [commentNumber, setCommentNumber] = useState(comments.length);

	const getMoreComments = () => {
		try {
			axios({
				url: `${URL}/api/apts/${user.apt.apt_id}/articles/${articleId}/comments?page=${page}&size=5`,
				method: "get",
			}).then((res) => {
				setComments([...comments, ...res.data.comments]);
				setPage(page + 1);
				setComment(res.data.comments.length);
				comments.map((comment) => setCommentNumber((prev) => prev + comment.replies.length));
			});
		} catch (err) {
			console.log(err);
		}
	};

	const getComments = (createOrDelete = "") => {
		try {
			axios({
				url: `${URL}/api/apts/${user.apt.apt_id}/articles/${articleId}/comments?page=0&size=5`,
				method: "get",
			}).then((res) => {
				setComments(res.data.comments);
				if (createOrDelete) setComment();
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getComments();
	}, []);

	return (
		<div>
			<CommentCreate
				articleId={articleId}
				getComments={getComments}
				getTotalComments={getTotalComments}
			/>
			{comments.length > 0 ? (
				<div className={style.comments}>
					<CommentsList
						articleId={articleId}
						comments={comments}
						getComments={getComments}
						getTotalComments={getTotalComments}
					/>
					<button
						onClick={getMoreComments}
						className={
							comments.length + commentNumber < totalComments ? style.more_comment : style.hidden
						}
					>
						+
					</button>
				</div>
			) : (
				<p className={style.no_comments}>작성된 댓글이 없습니다</p>
			)}
		</div>
	);
}

export default Comments;
