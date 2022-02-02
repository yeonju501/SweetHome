import axios from "axios";

function CommentDelete({ id, getComments, articleId }) {
	const URL = process.env.REACT_APP_SERVER_URL;
	const onClick = () => {
		axios({
			url: `${URL}/api/articles/comments/${id}`,
			method: "delete",
		}).then(() => getComments());
	};

	return <button onClick={onClick}>삭제</button>;
}

export default CommentDelete;
