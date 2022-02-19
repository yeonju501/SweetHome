import { useSelector } from "react-redux";
import style from "style/articles/ArticleDetailComment.module.css";
import CommentUpdate from "./CommentUpdate";

function CommentsList({ comments, getComments, getTotalComments }) {
	const user = useSelector((state) => state.userInfo);
	const articleId = useSelector((state) => state.article.articleId);

	return (
		<ul>
			{comments.length > 0 &&
				comments.map((comment) => (
					<li key={comment.id} className={style.comments_li}>
						<CommentUpdate
							comment={comment}
							getComments={getComments}
							user={user}
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
