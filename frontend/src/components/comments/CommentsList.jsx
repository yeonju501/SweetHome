import React from "react";
import CommentDelete from "./CommentDelete";

function CommentsList({ comments, articleId, getComments }) {
	return (
		<ul>
			{comments &&
				comments.map((comment) => (
					<li key={comment.id}>
						<p>{comment.username}</p>
						<p>{comment.content}</p>
						<p>{comment.created_at}</p>
						<CommentDelete id={comment.id} articleId={articleId} getComments={getComments} />
					</li>
				))}
		</ul>
	);
}

export default CommentsList;
