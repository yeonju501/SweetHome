import { useEffect, useState } from "react";
import profileFunction from "../../utils/profileFunction";

function ProfileComments() {
	const [comments, setComments] = useState("");

	useEffect(() => {
		profileFunction("articles/comments/mine", setComments);
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
