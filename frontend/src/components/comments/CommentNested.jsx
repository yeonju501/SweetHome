import { useState } from "react";
import axios from "axios";
import style from "style/articles/ArticleDetailComment.module.css";
import { useSelector } from "react-redux";
function CommentNested({ articleId, id, getComments, activate, setActivate }) {
	const URL = process.env.REACT_APP_SERVER_URL;
	const [comment, setComment] = useState({ content: "" });
	const user = useSelector((state) => state.userInfo.apt_house);
	const { content } = comment;

	const onChange = (e) => {
		setComment({ content: e.target.value });
	};

	const onClick = () => {
		setComment({ content: "" });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		content.trim() &&
			axios({
				url: `${URL}/api/apts/${user.apt.apt_id}/articles/${articleId}/comments/${id}`,
				method: "post",
				headers: { "Content-Type": "application/json" },
				data: comment,
			}).then(() => {
				onClick();
				getComments();
				setActivate(!activate);
			});
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
						<button
							onClick={() => {
								setComment("");
								setActivate(!activate);
							}}
							className={style.btn_nested}
						>
							취소
						</button>
						<button className={style.btn_nested} disabled={Boolean(content) === false}>
							등록
						</button>
					</div>
				</form>
			)}
		</div>
	);
}

export default CommentNested;
