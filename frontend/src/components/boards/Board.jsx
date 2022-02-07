import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import ArticleCreate from "../articles/ArticleCreate";
import style from "../../style/Board.module.css";

function Board() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const [articles, setArticles] = useState("");
	const [isStarred, setIsStarred] = useState(false);
	const location = useLocation();
	const board = location.state.board || location.state.favorite;

	const [pageNumber, setPageNumber] = useState(0);
	const [loading, setLoading] = useState(true);
	const pageEnd = useRef();
	const [maxPage, setMaxPage] = useState(1);

	useEffect(() => {
		getArticles();
		getStarred();
	}, [board.id, pageNumber]);

	const getArticles = () => {
		axios({
			url: `${SERVER_URL}/api/boards/${board.id}/articles?page=${pageNumber}&size=5`,
			method: "get",
		}).then((res) => {
			setArticles((prev) => [...prev, ...res.data.articles]);
			setMaxPage(res.data.total_page_count);
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
						if (pageNumber >= maxPage) observer.unobserve(pageEnd.current);
					}
				},
				{ threshold: 0.5 },
			);
			observer.observe(pageEnd.current);
		}
	}, [loading]);

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
			<div className={style.board_info}>
				<p>게시판명 : {board.name}</p>
				<p>게시판 소개글 : {board.Description}</p>
				<button onClick={handleStarClick}>{isStarred ? "⭐" : "☆"}</button>
			</div>
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
