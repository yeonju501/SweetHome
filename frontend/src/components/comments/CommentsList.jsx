import React from "react";

function CommentsList({ comments }) {
	return (
		<ul>
			{comments &&
				comments.map((comment) => (
					<li>
						<p>{comment.username}</p>
						<p>{comment.content}</p>
						<p>{comment.created_at}</p>
					</li>
				))}
		</ul>
	);
}

export default CommentsList;
