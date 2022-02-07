import React, { useState } from "react";
import { useSelector } from "react-redux";
import style from "../../style/articles/ArticleDetailComment.module.css";
import CommentNested from "./CommentNested";
import CommentUpdate from "./CommentUpdate";

function CommentsList({ comments, articleId, getComments }) {
	const user = useSelector((state) => state.userInfo.username);
	const [activate, setActivate] = useState(true);

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
							activate={activate}
							setActivate={setActivate}
						/>

						<CommentNested
							id={comment.id}
							articleId={articleId}
							getComments={getComments}
							activate={activate}
						/>
						{comment.replies.map((nestedComment) => (
							<div key={nestedComment.id}>
								<CommentUpdate
									comment={nestedComment}
									getComments={getComments}
									user={user}
									id={nestedComment.id}
								/>
								{/* {user === nestedComment.username && (
									<CommentDelete
										id={nestedComment.id}
										articleId={articleId}
										getComments={getComments}
									/>
								)} */}
							</div>
						))}
					</li>
				))}
		</ul>
	);
}

export default CommentsList;
