import React, { useState } from "react";
import { useSelector } from "react-redux";
import style from "../../style/articles/ArticleDetailComment.module.css";
import CommentNested from "./CommentNested";
import CommentUpdate from "./CommentUpdate";

function CommentsList({ comments, articleId, getComments }) {
	const user = useSelector((state) => state.userInfo.email);

	return (
		<ul>
			{comments &&
				comments.map((comment) => (
					<li key={comment.id} className={style.comments_li}>
						<CommentUpdate
							comment={comment}
							getComments={getComments}
							user={user}
							id={comment.id}
							articleId={articleId}
						/>
						{comment.replies.map((nestedComment) => (
							<div key={nestedComment.id} className={style.comments_nsted}>
								<CommentUpdate
									comment={nestedComment}
									getComments={getComments}
									user={user}
									id={nestedComment.id}
								/>
							</div>
						))}
					</li>
				))}
		</ul>
	);
}

export default CommentsList;
