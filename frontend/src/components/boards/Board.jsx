import { useEffect, useState } from "react";
import axios from "axios";
import ArticleCreate from "../articles/ArticleCreate";
import style from "../../style/Board.module.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Board({ currentBoard, setArticleClicked, setCurrentArticle }) {
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		currentBoard && getArticles();
	}, [currentBoard]);

	const getArticles = () => {
		axios({
			url: `${SERVER_URL}/api/boards/${currentBoard.id}/articles`,
			method: "get",
		}).then((res) => {
			setArticles(res.data);
		});
	};

	const handleArticleClick = (article) => {
		setCurrentArticle(article.id);
		setArticleClicked(true);
	};

	return (
		<div>
			<div className={style.board_info}>
				<p>게시판명 : {currentBoard.name}</p>
				<p>게시판 소개글 : {currentBoard.description}</p>
			</div>
			{currentBoard ? <ArticleCreate boardId={currentBoard.id} getArticles={getArticles} /> : null}
			<ul>
				{articles.map((article) => (
					<li
						className={style.article}
						key={article.id}
						id={article.id}
						onClick={() => {
							handleArticleClick(article);
						}}
					>
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
