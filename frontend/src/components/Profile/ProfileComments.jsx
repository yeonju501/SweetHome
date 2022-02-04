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
			{/* Link로 해당 게시글로 이동 기능 추가 예정 */}
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
