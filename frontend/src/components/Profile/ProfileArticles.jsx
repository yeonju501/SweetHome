import { useEffect, useState } from "react";
import axios from "axios";

function ProfileArticles() {
	const URL = process.env.REACT_APP_SERVER_URL;
	const [articles, setArticles] = useState("");

	useEffect(() => {
		axios(`${URL}/api/boards/articles/mine`).then((res) => setArticles(res.data));
	}, []);

	return (
		<div>
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

export default ProfileArticles;
