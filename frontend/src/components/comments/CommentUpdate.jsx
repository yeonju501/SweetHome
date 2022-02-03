import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

function CommentUpdate({ comment, getComments }) {
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
						<input type="text" value={content || ""} onChange={onChange} />
						<button>확인</button>
					</form>
				</div>
			) : (
				<div>
					<p>{comment.username}</p>
					<p>{comment.content}</p>
					<p>{comment.created_at}</p>
					<button onClick={onClick}>수정</button>
				</div>
			)}
		</>
	);
}

export default CommentUpdate;
