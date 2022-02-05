import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import ArticleCreate from "../articles/ArticleCreate";
import style from "../../style/Board.module.css";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

function Board() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const [articles, setArticles] = useState("");
	const location = useLocation();
	const boardId = location.state.id;
	const boardName = location.state.name;
	const boardDescription = location.state.description;

	useEffect(() => {
		getArticles();
	}, [boardId]);

	const getArticles = () => {
		axios({
			url: `${SERVER_URL}/api/boards/${boardId}/articles`,
			method: "get",
		}).then((res) => {
			setArticles(res.data.articles);
		});
	};

	return (
		<div>
			<Navbar />
			<Sidebar />
			<div className={style.board_info}>
				<p>게시판명 : {boardName}</p>
				<p>게시판 소개글 : {boardDescription}</p>
			</div>
			<ArticleCreate boardId={boardId} getArticles={getArticles} />
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
