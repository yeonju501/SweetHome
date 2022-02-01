import { useState } from "react";

function CommentCreate() {
	const [comment, setComment] = useState("");

	const onChange = (e) => {
		setComment(e.target.value);
	};

	return (
		<div>
			<input type="text" onChange={onChange} value={comment} placeholder="댓글을 남겨 보세요" />
		</div>
	);
}

export default CommentCreate;
