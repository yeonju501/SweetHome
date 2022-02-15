import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import ArticleCreate from "../articles/ArticleCreate";
import style from "style/Board.module.css";
import BoardInfo from "./BoardInfo";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";

function Board() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const [articles, setArticles] = useState("");
	const [pageNumber, setPageNumber] = useState(0);
	const [loading, setLoading] = useState(true);
	const location = useLocation();
	const board = location.state.board || location.state.favorite;
	const user = useSelector((state) => state.userInfo.apt_house);

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
				url: `${SERVER_URL}/api/apts/${user.apt.apt_id}/boards/${board.id}/articles?size=5`,
				method: "get",
			});
			setPageNumber(0);
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
				url: `${SERVER_URL}/api/apts/${user.apt.apt_id}/boards/${board.id}/articles?page=${pageNumber}&size=5`,
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
			root: document.querySelector("#infiniteScroll"),
			rootMargin: "20px",
			threshold: 1,
		};
		const observer = new IntersectionObserver(handleObserver, option);
		if (pageEnd.current) observer.observe(pageEnd.current);
	}, [pageEnd.current]);

	return (
		<div className={style.body}>
			<BoardInfo board={board} />
			<ArticleCreate
				boardId={board.id}
				setPageNumber={setPageNumber}
				getArticles={getArticles}
				setArticles={setArticles}
			/>

			{articles && (
				<div id="infiniteScroll" className={style.article_list}>
					<ul>
						{articles.map((article, idx) => (
							<li className={style.article} key={idx}>
								<Link
									to={`/articles/${article.id}`}
									state={{ articleId: article.id, board: board }}
								>
									<p>{article.username}</p>
									<p>{article.created_at.slice(0, 10)}</p>
									<h3>{article.title}</h3>
									{article.image_url && (
										<div>
											<img
												src={article.image_url}
												alt=""
												style={{ width: "20rem", height: "20rem" }}
											/>
										</div>
									)}
									<p>{article.content}</p>
									<div>
										<FontAwesomeIcon icon={fasHeart} color="#888888" />
										<span>{article.total_likes}</span>
										<FontAwesomeIcon icon={faComment} color="#595959" />
										<span>{article.total_replies}</span>
									</div>
								</Link>
							</li>
						))}
					</ul>
					<div ref={pageEnd}>페이지의 끝입니다</div>
				</div>
			)}
		</div>
	);
}

export default Board;
