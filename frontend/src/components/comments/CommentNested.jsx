import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import style from "../../style/articles/ArticleDetailComment.module.css";

function CommentNested({ articleId, id, getComments, activate }) {
	const URL = process.env.REACT_APP_SERVER_URL;
	const [comment, setComment] = useState({ content: "" });

	const { content } = comment;

	const onChange = (e) => {
		setComment({ content: e.target.value });
	};

	const onClick = () => {
		setComment({ content: "" });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		content.trim()
			? axios({
					url: `${URL}/api/articles/${articleId}/comments/${id}`,
					method: "post",
					headers: { "Content-Type": "application/json" },
					data: comment,
			  }).then(() => {
					onClick();
					getComments();
			  })
			: toast.error("error");
	};
	return (
		<div>
			{activate ? null : (
				<form onSubmit={onSubmit} className={style.nestedComments}>
					<textarea
						type="text"
						placeholder="댓글을 남겨 보세요"
						onChange={onChange}
						onSubmit={onSubmit}
						value={content}
					/>
					<div className={style.btn_nested_comments}>
						<button onClick={onClick} className={style.btn_nested}>
							취소
						</button>
						<button className={style.btn_nested}>등록</button>
					</div>
				</form>
			)}
		</div>
	);
}

export default CommentNested;
