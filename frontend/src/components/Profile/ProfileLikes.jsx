import { useEffect, useState } from "react";
import axios from "axios";

function ProfileLikes() {
	const URL = process.env.REACT_APP_SERVER_URL;
	const [articles, setArticles] = useState("");

	useEffect(() => {
		axios(`${URL}/api/articles/likes/mine`).then((res) => {
			setArticles(res.data);
			console.log("success");
		});
	}, []);

	return (
		<div>
			{/* Link로 해당 게시글로 이동 기능 추가 예정 */}
			{articles &&
				articles.map((article, idx) => (
					<div key={idx}>
						<p>{article.title}</p>
						<p>{article.created_at}</p>
					</div>
				))}
		</div>
	);
}

export default ProfileLikes;
