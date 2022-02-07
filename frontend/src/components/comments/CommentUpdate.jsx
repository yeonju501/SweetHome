import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import style from "../../style/articles/ArticleDetailComment.module.css";
function CommentUpdate({ comment, getComments, user, id, setActivate, activate }) {
	const [update, setUpdate] = useState(false);
	const [commentContent, setCommentContent] = useState({ content: comment.content });
	const { content } = commentContent;
	const URL = process.env.REACT_APP_SERVER_URL;
	const onChange = (e) => {
		setCommentContent({ content: e.target.value });
	};

	const onClick = () => {
		setUpdate(!update);
	};

	const commentDelete = () => {
		if (window.confirm("댓글을 삭제 하시겠습니까?")) {
			axios({
				url: `${URL}/api/articles/comments/${id}`,
				method: "delete",
			}).then(() => getComments());
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		content.trim()
			? axios({
					url: `${URL}/api/articles/comments/${comment.id}`,
					method: "put",
					headers: { "Content-Type": "application/json" },
					data: commentContent,
			  }).then(() => {
					getComments();
					onClick();
			  })
			: toast.error("Error");
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
					<p className={style.comment_username}>{comment.username}</p>
					<p>{comment.content}</p>
					<div className={style.date_btn}>
						<p>{comment.created_at.slice(0, 10)}</p>
						<p onClick={() => setActivate(!activate)}>댓글 달기</p>
					</div>
					{user === comment.username && activate && (
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
		</>
	);
}

export default CommentUpdate;
