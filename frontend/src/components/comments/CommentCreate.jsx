import { useState } from "react";
import axios from "axios";

function CommentCreate({ articleId, getComments }) {
	const URL = process.env.REACT_APP_SERVER_URL;
	const [comment, setComment] = useState({ content: "" });
	const { content } = comment;
	const onChange = (e) => {
		setComment({ content: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		axios({
			url: `${URL}/api/articles/${articleId}/comments`,
			method: "post",
			headers: { "Content-Type": "application/json;charset=UTF-8" },
			data: comment,
		}).then(() => {
			setComment({ content: "" });
			getComments();
		});
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input type="text" onChange={onChange} value={content} placeholder="댓글을 남겨 보세요" />
				<button>작성</button>
			</form>
		</div>
	);
}

export default CommentCreate;
