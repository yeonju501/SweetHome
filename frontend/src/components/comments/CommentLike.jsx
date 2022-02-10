import style from "style/articles/ArticleDetailComment.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

function CommentLike({ comment, setActivate, activate, likeOrCancelLike, isLike }) {
	return (
		<div className={style.date_btn}>
			<p>{comment.created_at.slice(0, 10)}</p>
			{comment.total_likes === 0 ? null : comment.total_likes === 1 ? (
				<p>{comment.total_likes}like</p>
			) : (
				<p>{comment.total_likes}likes</p>
			)}
			{comment.replies ? <p onClick={() => setActivate(!activate)}>댓글 달기</p> : null}

			<p onClick={likeOrCancelLike} className={style.btn_comment_like}>
				{isLike ? (
					<FontAwesomeIcon icon={fasHeart} color="red" />
				) : (
					<FontAwesomeIcon icon={farHeart} color="gray" />
				)}
			</p>
		</div>
	);
}

export default CommentLike;
