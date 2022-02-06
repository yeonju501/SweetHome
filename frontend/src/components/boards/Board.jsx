import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import ArticleCreate from "../articles/ArticleCreate";
import style from "../../style/Board.module.css";
import Navbar from "../Navbar";
import SidebarBoards from "../SidebarBoards";

function Board() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const [articles, setArticles] = useState("");
	const [isStarred, setIsStarred] = useState(false);
	const location = useLocation();
	const board = location.state.board || location.state.favorite;

	useEffect(() => {
		getArticles();
		getStarred();
	}, [board.id]);

	const getArticles = () => {
		axios({
			url: `${SERVER_URL}/api/boards/${board.id}/articles`,
			method: "get",
		}).then((res) => {
			setArticles(res.data.articles);
		});
	};

	const getStarred = () => {
		axios({
			url: `${SERVER_URL}/api/boards/${board.id}/favorites`,
			method: "get",
		}).then((res) => {
			setIsStarred(res.data.is_liked);
		});
	};

	const handleStarClick = () => {
		const method = isStarred ? "delete" : "post";

		axios({
			url: `${SERVER_URL}/api/boards/${board.id}/favorites`,
			method: method,
		}).then(() => {
			setIsStarred((prev) => !prev);
		});
	};

	return (
		<div>
			<Navbar />
			<SidebarBoards />
			<div className={style.board_info}>
				<p>게시판명 : {board.name}</p>
				<p>게시판 소개글 : {board.Description}</p>
				<button onClick={handleStarClick}>{isStarred ? "⭐" : "☆"}</button>
			</div>
			<ArticleCreate boardId={board.id} getArticles={getArticles} />
			<hr />
			{articles && (
				<ul>
					{articles.map(({ id, username, title, content, created_at }) => (
						<li className={style.article} key={id}>
							<Link to={`/articles/${id}`} state={{ id }}>
								<p>{username}</p>
								<p>{created_at}</p>
								<h3>{title}</h3>
								<p>{content}</p>
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default Board;
