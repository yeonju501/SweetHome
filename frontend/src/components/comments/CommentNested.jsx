import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function CommentNested({ articleId, id, getComments }) {
	const URL = process.env.REACT_APP_SERVER_URL;

	const [activate, setActivate] = useState(true);
	const [comment, setComment] = useState({ content: "" });

	const { content } = comment;

	const onChange = (e) => {
		setComment({ content: e.target.value });
	};

	const onClick = () => {
		setActivate(!activate);
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
			{activate ? (
				<p onClick={onClick}>댓글 달기</p>
			) : (
				<form onSubmit={onSubmit}>
					<input
						type="text"
						placeholder="댓글을 남겨 보세요"
						onChange={onChange}
						onSubmit={onSubmit}
						value={content}
					/>
					<p onClick={onClick}>취소</p>
					<button>등록</button>
				</form>
			)}
		</div>
	);
}

export default CommentNested;
