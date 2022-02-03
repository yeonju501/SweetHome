import { useEffect, useState } from "react";
import axios from "axios";

function ProfileArticles() {
	const URL = process.env.REACT_APP_SERVER_URL;
	const [articles, setArticles] = useState("");

	useEffect(() => {
		axios.get(`${URL}/api/articles/mine`).then((res) => setArticles(res.data));
	});

	return <div>{articles && articles.map((article) => <p>article</p>)}</div>;
}

export default ProfileArticles;
