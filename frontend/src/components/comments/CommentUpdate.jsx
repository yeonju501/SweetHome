import React, { useEffect, useState } from "react";
import CommentNested from "./CommentNested";
import style from "style/articles/ArticleDetailComment.module.css";
import CommentLike from "./CommentLike";
import { commnetAxios, deleteOrSubmit } from "utils/commentAxios";
import CommentButton from "./CommentButton";

function CommentUpdate({ comment, getComments, user, id, articleId, getTotalComments }) {
	const [update, setUpdate] = useState(false);
	const [commentContent, setCommentContent] = useState({ content: comment.content });
	const [activate, setActivate] = useState(true);
	const [isLike, setIsLike] = useState(false);
	const { content } = commentContent;

	useEffect(() => {
		isLiked();
		getComments();
	}, [isLike]);

	const onChange = (e) => {
		setCommentContent({ content: e.target.value });
	};

	const onClick = () => {
		setUpdate(!update);
	};

	const likeOrCancelLike = () => {
		const method = isLike ? "delete" : "post";
		const res = commnetAxios(user.apt_house.apt.apt_id, comment.id, method);
		if (res) {
			setIsLike((prev) => !prev);
			getComments();
		}
	};

	const isLiked = async () => {
		const res = await commnetAxios(user.apt_house.apt.apt_id, comment.id, "get");
		res && setIsLike(res.data.is_liked);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (content.trim()) {
			const res = await deleteOrSubmit(
				user.apt_house.apt.apt_id,
				comment.id,
				"put",
				commentContent,
			);
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
						<div className={style.update_btn}>
							<button className={style.update_confirm}>확인</button>
						</div>
					</form>
				</div>
			) : (
				<div className={style.comments_box}>
					<p id={style.comment_username}>{comment.username}</p>
					<p className={style.comment_content}>{comment.content}</p>
					<CommentLike
						comment={comment}
						setActivate={setActivate}
						activate={activate}
						likeOrCancelLike={likeOrCancelLike}
						isLike={isLike}
					/>
					<CommentButton
						user={user}
						comment={comment}
						activate={activate}
						onClick={onClick}
						id={id}
						getComments={getComments}
					/>
				</div>
			)}
			<CommentNested
				id={comment.id}
				articleId={articleId}
				getComments={getComments}
				activate={activate}
				setActivate={setActivate}
				getTotalComments={getTotalComments}
			/>
		</>
	);
}

export default CommentUpdate;
