import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import ArticleCreate from "../articles/ArticleCreate";
import style from "../../style/Board.module.css";
import BoardInfo from "./BoardInfo";

function Board() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const [articles, setArticles] = useState("");
	const location = useLocation();
	const board = location.state.board || location.state.favorite;

	const [pageNumber, setPageNumber] = useState(0);
	const [loading, setLoading] = useState(true);
	const pageEnd = useRef();
	const [maxPageNumber, setMaxPageNumber] = useState(1);

	useEffect(() => {
		setPageNumber(0);
		setArticles("");
	}, [board.id]);

	useEffect(() => {
		getArticles();
	}, [pageNumber, board.id]);

	const getArticles = () => {
		axios({
			url: `${SERVER_URL}/api/boards/${board.id}/articles?page=${pageNumber}&size=5`,
			method: "get",
		}).then((res) => {
			console.log(board.id, pageNumber);
			setArticles((prev) => [...prev, ...res.data.articles]);
			setMaxPageNumber(res.data.total_page_count);
			setLoading(false);
		});
	};

	const loadMore = () => {
		setPageNumber((prev) => prev + 1);
	};

	useEffect(() => {
		if (loading) {
			const observer = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting) {
						loadMore();
						// if (pageNumber > maxPageNumber) observer.unobserve(pageEnd.current);
					}
				},
				{ threshold: 1 },
			);
			observer.observe(pageEnd.current);
		}
	}, [loading, maxPageNumber]);

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
						{articles.map((article) => (
							<li className={style.article} key={article.id}>
								<Link to={`/articles/${article.id}`} state={{ id: article.id }}>
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
