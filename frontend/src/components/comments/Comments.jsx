import { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentsList from "./CommentsList";
import style from "style/articles/ArticleDetailComment.module.css";

function Comments({ articleId, setComment }) {
	const URL = process.env.REACT_APP_SERVER_URL;
	const [comments, setComments] = useState([]);
	const [total, setTotal] = useState(0);
	const getComments = () => {
		axios({
			url: `${URL}/api/articles/${articleId}/comments?page=0&size=5`,
			method: "get",
		}).then((res) => {
			console.log(res.data.comments);
			setComments(res.data.comments);
			setComment(res.data.comments.length);
		});
	};
	useEffect(() => {
		getComments();
	}, []);

	return (
		<div>
			<CommentCreate articleId={articleId} getComments={getComments} />
			{comments.length > 0 ? (
				<div>
					<CommentsList articleId={articleId} comments={comments} getComments={getComments} />
					<button className={comments.length === total ? style.hidden : null}>+</button>
				</div>
			) : (
				<p>작성된 댓글이 없습니다</p>
			)}
		</div>
	);
}

export default Comments;
