import { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentsList from "./CommentsList";

function Comments({ articleId }) {
	const URL = process.env.REACT_APP_SERVER_URL;
	const [comments, setComments] = useState(null);

	const getComments = () => {
		axios({
			url: `${URL}/api/articles/${articleId}/comments`,
			method: "get",
		}).then((res) => setComments(res.data));
	};
	useEffect(() => {
		getComments();
	}, []);

	return (
		<div>
			{comments ? (
				<CommentsList articleId={articleId} commnets={comments} />
			) : (
				<p>작성된 댓글이 없습니다</p>
			)}
			<CommentCreate articleId={articleId} />
		</div>
	);
}

export default Comments;
