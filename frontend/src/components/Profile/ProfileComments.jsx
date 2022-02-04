import { useEffect, useState } from "react";
import axios from "axios";

function ProfileComments() {
	const URL = process.env.REACT_APP_SERVER_URL;
	const [comments, setComments] = useState("");

	useEffect(() => {
		axios(`${URL}/api/articles/comments/mine`).then((res) => setComments(res.data));
	}, []);

	return (
		<div>
			{comments &&
				comments.map((comment, idx) => (
					<div key={idx}>
						<p>{comment.content}</p>
						<p>{comment.created_at}</p>
					</div>
				))}
		</div>
	);
}

export default ProfileComments;
