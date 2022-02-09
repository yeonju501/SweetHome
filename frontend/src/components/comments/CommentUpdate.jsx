import React, { useEffect, useState } from "react";
import CommentNested from "./CommentNested";
import style from "../../style/articles/ArticleDetailComment.module.css";
import CommentLike from "./CommentLike";
import { commnetAxios, deleteOrSubmit } from "../../utils/commentAxios";

function CommentUpdate({ comment, getComments, user, id, articleId }) {
	const [update, setUpdate] = useState(false);
	const [commentContent, setCommentContent] = useState({ content: comment.content });
	const [activate, setActivate] = useState(true);
	const [isLike, setIsLike] = useState(false);
	const { content } = commentContent;

	useEffect(() => {
		isLiked();
	}, []);

	const onChange = (e) => {
		setCommentContent({ content: e.target.value });
	};

	const onClick = () => {
		setUpdate(!update);
	};

	const likeOrCancelLike = () => {
		const method = isLike ? "delete" : "post";

		const res = commnetAxios(comment.id, method);
		if (res) {
			setIsLike((prev) => !prev);
			getComments();
		}
	};

	const isLiked = async () => {
		const res = await commnetAxios(comment.id, "get");
		res && setIsLike(res.data.is_liked);
	};

	const commentDelete = async () => {
		if (window.confirm("댓글을 삭제 하시겠습니까?")) {
			const res = await deleteOrSubmit(id, "delete");
			res && getComments();
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (content.trim()) {
			const res = await deleteOrSubmit(comment.id, "put", commentContent);
			if (res) {
				getComments();
				onClick();
			}
		}
	};

	return (
		<>
			{update ? (
				<div>
					<form onSubmit={onSubmit}>
						<p>{comment.username}</p>
						<textarea type="text" value={content || ""} onChange={onChange} />
						<button>확인</button>
					</form>
				</div>
			) : (
				<div className={style.comments_box}>
					<p id={style.comment_username}>{comment.username}</p>
					<p>{comment.content}</p>
					<CommentLike
						comment={comment}
						setActivate={setActivate}
						activate={activate}
						likeOrCancelLike={likeOrCancelLike}
						isLike={isLike}
					/>
					{user === comment.email && activate && (
						<div className={style.btn_nested_comments}>
							<button className={style.btn_nested} onClick={onClick}>
								수정
							</button>
							<button className={style.btn_nested} onClick={commentDelete}>
								삭제
							</button>
						</div>
					)}
				</div>
			)}
			<CommentNested
				id={comment.id}
				articleId={articleId}
				getComments={getComments}
				activate={activate}
				setActivate={setActivate}
			/>
		</>
	);
}

export default CommentUpdate;
