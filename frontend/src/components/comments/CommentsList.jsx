import React from "react";
import CommentDelete from "./CommentDelete";
import CommentNested from "./CommentNested";
import CommentUpdate from "./CommentUpdate";

function CommentsList({ comments, articleId, getComments }) {
	return (
		<ul>
			{comments &&
				comments.map((comment) => (
					<li key={comment.id}>
						<CommentUpdate comment={comment} getComments={getComments} />
						<CommentDelete id={comment.id} articleId={articleId} getComments={getComments} />
						<CommentNested id={comment.id} articleId={articleId} getComments={getComments} />
						{comment.replies.map((nestedComment) => (
							<div key={nestedComment.id}>
								<CommentUpdate comment={nestedComment} getComments={getComments} />
								<CommentDelete
									id={nestedComment.id}
									articleId={articleId}
									getComments={getComments}
								/>
							</div>
						))}
					</li>
				))}
		</ul>
	);
}

export default CommentsList;
