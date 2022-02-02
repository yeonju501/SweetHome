import React from "react";
import CommentDelete from "./CommentDelete";
import CommentUpdate from "./CommentUpdate";

function CommentsList({ comments, articleId, getComments }) {
	return (
		<ul>
			{comments &&
				comments.map((comment) => (
					<li key={comment.id}>
						<CommentUpdate comment={comment} getComments={getComments} />
						<CommentDelete id={comment.id} articleId={articleId} getComments={getComments} />
					</li>
				))}
		</ul>
	);
}

export default CommentsList;
