import { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentsList from "./CommentsList";
import style from "style/articles/ArticleDetailComment.module.css";
import { useSelector } from "react-redux";

function Comments({ articleId, setComment, totalComments }) {
	const URL = process.env.REACT_APP_SERVER_URL;
	const [comments, setComments] = useState([]);
	const user = useSelector((state) => state.userInfo.apt_house);
	const [page, setPage] = useState(1);
	const getMoreComments = () => {
		try {
			axios({
				url: `${URL}/api/apts/${user.apt.apt_id}/articles/${articleId}/comments?page=${page}&size=5`,
				method: "get",
			}).then((res) => {
				setPage(page + 1);
				setComments([...comments, ...res.data.comments]);
				setComment(res.data.comments.length);
			});
		} catch (err) {
			console.log(err);
		}
	};

	const getComments = () => {
		try {
			axios({
				url: `${URL}/api/apts/${user.apt.apt_id}/articles/${articleId}/comments?page=0&size=5`,
				method: "get",
			}).then((res) => {
				setComments(res.data.comments);
				setComment();
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
			<CommentCreate articleId={articleId} getComments={getComments} />
			{comments.length > 0 ? (
				<div className={style.comments}>
					<CommentsList articleId={articleId} comments={comments} getComments={getComments} />
					<button
						onClick={getMoreComments}
						className={comments.length < totalComments ? style.more_comment : style.hidden}
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
