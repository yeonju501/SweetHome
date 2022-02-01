import { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentsList from "./CommentsList";

function Comments() {
	const URL = process.env.REACT_APP_SERVER_URL;
	const [comments, setComments] = useState(null);

	useEffect(() => {
		axios({
			url: `${URL}/api/articles/${articleId}/comments`,
			method: "get",
		}).then((res) => setComments(res.data));
	});
	return (
		<div>
			<CommentsList commnets={comments} />
			<CommentCreate />
		</div>
	);
}

export default Comments;
