import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import style from "style/articles/ArticleDetailComment.module.css";

function CommentCreate({ articleId, getComments, onClick, isMax }) {
	const URL = process.env.REACT_APP_SERVER_URL;
	const [comment, setComment] = useState({ content: "" });
	const { content } = comment;
	const onChange = (e) => {
		setComment({ content: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		content.trim()
			? axios({
					url: `${URL}/api/articles/${articleId}/comments`,
					method: "post",
					headers: { "Content-Type": "application/json;charset=UTF-8" },
					data: comment,
			  }).then(() => {
					setComment({ content: "" });
					getComments();
			  })
			: toast.error("error");
	};

	return (
		<div>
			<form onSubmit={onSubmit} className={style.create_form}>
				<textarea
					type="text"
					onChange={onChange}
					value={content}
					placeholder="댓글을 남겨 보세요"
				/>
				<button className={style.btn_nested} disabled={Boolean(content) === false}>
					작성
				</button>
			</form>
		</div>
	);
}

export default CommentCreate;
