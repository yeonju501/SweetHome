import { useSelector } from "react-redux";
import style from "style/articles/ArticleDetailComment.module.css";
import CommentUpdate from "./CommentUpdate";

function CommentsList({ comments, articleId, getComments, getTotalComments }) {
	const user = useSelector((state) => state.userInfo);

	return (
		<ul>
			{comments.length > 0 &&
				comments.map((comment) => (
					<li key={comment.id} className={style.comments_li}>
						<CommentUpdate
							comment={comment}
							getComments={getComments}
							user={user}
							articleId={articleId}
							getTotalComments={getTotalComments}
						/>
						{comment.replies.map((nestedComment) => (
							<div key={nestedComment.id} className={style.comments_nsted}>
								<CommentUpdate
									comment={nestedComment}
									getComments={getComments}
									user={user}
									getTotalComments={getTotalComments}
								/>
							</div>
						))}
					</li>
				))}
		</ul>
	);
}

export default CommentsList;
