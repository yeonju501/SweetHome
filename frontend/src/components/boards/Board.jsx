import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import ArticleCreate from "../articles/ArticleCreate";
import style from "style/Board.module.css";
import BoardInfo from "./BoardInfo";

function Board() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const [articles, setArticles] = useState("");
	const [pageNumber, setPageNumber] = useState(0);
	const [loading, setLoading] = useState(true);
	const location = useLocation();
	const board = location.state.board || location.state.favorite;

	const pageEnd = useRef(null);

	useEffect(() => {
		setLoading(true);
		getArticles2();
	}, [board]);

	useEffect(() => {
		if (pageNumber !== 0) getArticles();
	}, [pageNumber]);

	const handleObserver = useCallback((entries) => {
		const target = entries[0];
		if (target.isIntersecting) {
			setPageNumber((prev) => prev + 1);
		}
	}, []);

	const getArticles2 = useCallback(async () => {
		try {
			await setLoading(true);
			const res = await axios({
				url: `${SERVER_URL}/api/boards/${board.id}/articles?size=8`,
				method: "get",
			});
			setArticles(res.data.articles);
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
	}, [board]);

	const getArticles = useCallback(async () => {
		try {
			await setLoading(true);
			const res = await axios({
				url: `${SERVER_URL}/api/boards/${board.id}/articles?page=${pageNumber}&size=6`,
				method: "get",
			});
			console.log(res.data);
			await setArticles((prev) => [...prev, ...res.data.articles]);
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
	}, [pageNumber]);

	useEffect(() => {
		const option = {
			root: document.querySelector(".ulTag"),
			rootMargin: "20px",
			threshold: 1,
		};
		const observer = new IntersectionObserver(handleObserver, option);
		if (pageEnd.current) observer.observe(pageEnd.current);
	}, [handleObserver]);

	return (
		<div>
			<BoardInfo board={board} />
			<ArticleCreate
				boardId={board.id}
				setPageNumber={setPageNumber}
				getArticles={getArticles}
				setArticles={setArticles}
			/>
			<hr />

			{articles && (
				<ul style={{ overflow: "scroll", height: "100vh" }} className={style.ulTag}>
					{articles.map((article, idx) => (
						<li className={style.article} key={idx} style={{ fontSize: "3rem" }}>
							<Link to={`/articles/${article.id}`} state={{ articleId: article.id, board: board }}>
								<p>{article.username}</p>
								<p>{article.created_at}</p>
								<h3>{article.title}</h3>
								<p>{article.content}</p>
							</Link>
						</li>
					))}
				</ul>
			)}
			<div ref={pageEnd}>hi</div>
		</div>
	);
}

export default Board;
