import React from "react";

function CommentsList({ comments }) {
	return (
		<ul>
			{comments &&
				comments.map((comment) => (
					<li key={comment.id}>
						<p>{comment.username}</p>
						<p>{comment.content}</p>
						<p>{comment.created_at}</p>
					</li>
				))}
		</ul>
	);
}

export default CommentsList;
