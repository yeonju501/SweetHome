import style from "../../style/articles/ArticleDetailComment.module.css";
import { deleteOrSubmit } from "../../utils/commentAxios";

function CommentButton({ user, comment, activate, onClick, id, getComments }) {
	const commentDelete = async () => {
		if (window.confirm("댓글을 삭제 하시겠습니까?")) {
			const res = await deleteOrSubmit(id, "delete");
			res && getComments();
		}
	};

	return (
		<>
			{user === comment.email && activate && (
				<div className={style.btn_nested_comments}>
					<button className={style.btn_nested} onClick={onClick}>
						수정
					</button>
					<button className={style.btn_nested} onClick={commentDelete}>
						삭제
					</button>
				</div>
			)}
		</>
	);
}

export default CommentButton;
