import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import CreateArticle from "./articles/CreateArticle";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Board({ currentBoard }) {
	const token = useSelector((state) => state.token.token);
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		console.log(currentBoard);
		currentBoard && getArticles();
	}, [currentBoard]);

	const getArticles = () => {
		axios({
			url: `${SERVER_URL}/api/boards/${currentBoard.id}/articles`,
			method: "get",
		})
			.then((res) => {
				console.log(res);
				setArticles(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<div>
				<p>{currentBoard.name}</p>
				<p>{currentBoard.description}</p>
			</div>
			{currentBoard ? <CreateArticle boardId={currentBoard.id} getArticles={getArticles} /> : null}
			<ul>
				{articles.map((article) => (
					<li key={article.id}>
						<p>{article.username}</p>
						<p>{article.created_at}</p>
						<h3>{article.title}</h3>
						<p>{article.content}</p>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Board;
