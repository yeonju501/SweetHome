import { useEffect, useState } from "react";
import * as axiosRequest from "../../utils/profileFunction";
import CommentCreate from "./CommentCreate";
import CommentsList from "./CommentsList";

function Comments({ articleId }) {
	const [comments, setComments] = useState([]);

	useEffect(() => {
		axiosRequest.GETDATA(`articles/${articleId}/comments`, setComments, "comments");
	}, []);

	return (
		<div>
			{comments.length > 0 ? (
				<CommentsList articleId={articleId} comments={comments} getComments={getComments} />
			) : (
				<p>작성된 댓글이 없습니다</p>
			)}
			<CommentCreate articleId={articleId} getComments={getComments} />
		</div>
	);
}

export default Comments;
