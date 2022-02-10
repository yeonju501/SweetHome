import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import ArticleCreate from "../articles/ArticleCreate";
import style from "style/Board.module.css";
import BoardInfo from "./BoardInfo";

function Board() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const [articles, setArticles] = useState("");
	const location = useLocation();
	const board = location.state.board || location.state.favorite;

	const [pageNumber, setPageNumber] = useState(0);
	const [loading, setLoading] = useState(true);
	const pageEnd = useRef();
	const maxPageNumber = 500;

	useEffect(() => {
		setLoading(true);
		setArticles("");
		setPageNumber(0);
		console.log("게시판바뀜");
	}, [board]);

	useEffect(() => {
		getArticles();
	}, [pageNumber]);

	const getArticles = () => {
		console.log(pageNumber, maxPageNumber);
		if (pageNumber < maxPageNumber) {
			axios({
				url: `${SERVER_URL}/api/boards/${board.id}/articles?page=${pageNumber}&size=7`,
				method: "get",
			}).then((res) => {
				console.log(`${pageNumber}번 페이지 getArticle`);
				if (pageNumber < res.data.total_page_count) {
					setArticles((prev) => [...prev, ...res.data.articles]);
					setLoading(false);
				}
			});
		}
	};

	useEffect(() => {
		if (loading) {
			const observer = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting) {
						console.log("감지!");
						loadMore();
					}
				},
				{ threshold: 1 },
			);
			observer.observe(pageEnd.current);
		}
	}, [loading, board]);

	const loadMore = () => {
		setPageNumber((prev) => prev + 1);
	};

	return (
		<div>
			<BoardInfo board={board} />
			<ArticleCreate
				boardId={board.id}
				getArticles={getArticles}
				setPageNumber={setPageNumber}
				setArticles={setArticles}
			/>
			<hr />
			{loading ? (
				<p>loading...</p>
			) : (
				articles && (
					<ul>
						{articles.map((article, idx) => (
							<li className={style.article} key={idx}>
								<Link
									to={`/articles/${article.id}`}
									state={{ articleId: article.id, board: board }}
								>
									<p>{article.username}</p>
									<p>{article.created_at}</p>
									<h3>{article.title}</h3>
									<p>{article.content}</p>
								</Link>
							</li>
						))}
					</ul>
				)
			)}
			<div ref={pageEnd}></div>
		</div>
	);
}

export default Board;
