import { useState } from "react";
import axios from "axios";

function CommentCreate() {
	const URL = process.env.REACT_APP_SERVER_URL;
	const [comment, setComment] = useState("");

	const onChange = (e) => {
		setComment(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		axios({
			url: `${URL}//api/articles/${articleId}/comments`,
			method: "post",
			data: comment,
		});
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input type="text" onChange={onChange} value={comment} placeholder="댓글을 남겨 보세요" />
			</form>
		</div>
	);
}

export default CommentCreate;
