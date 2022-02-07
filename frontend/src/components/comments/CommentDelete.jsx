import axios from "axios";

function CommentDelete({ id, getComments }) {
	const URL = process.env.REACT_APP_SERVER_URL;
	const onClick = () => {
		if (window.confirm("댓글을 삭제 하시겠습니까?")) {
			axios({
				url: `${URL}/api/articles/comments/${id}`,
				method: "delete",
			}).then(() => getComments());
		}
	};

	return <button onClick={onClick}>삭제</button>;
}

export default CommentDelete;
