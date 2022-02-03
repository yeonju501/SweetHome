import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BoardList from "../components/boards/BoardList";
import CreateBoard from "../components/boards/CreateBoard";
import Board from "../components/boards/Board";
import ArticleDetail from "../components/articles/ArticleDetail";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { SET_USER } from "../store/user";
import style from "../style/Main.module.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Main() {
	const dispatch = useDispatch();
	const [userInfo, setUserInfo] = useState(null);
	const [boards, setBoards] = useState([]);
	const [articleClicked, setArticleClicked] = useState(false);
	const [currentBoard, setCurrentBoard] = useState("");
	const [currentArticle, setCurrentArticle] = useState("");

	useEffect(() => {
		axios({
			url: `${SERVER_URL}/api/members/my-profile`,
			method: "get",
		}).then((res) => {
			setUserInfo(res.data);
			dispatch(SET_USER(res.data));
		});
	}, []);

	useEffect(() => {
		axios({
			url: `${SERVER_URL}/api/boards`,
			method: "get",
		}).then((res) => {
			setBoards(res.data);
		});
	}, []);

	return (
		userInfo && (
			<div>
				<Navbar />
				<CreateBoard />
				<div className={style.main}>
					<BoardList
						boards={boards}
						setCurrentBoard={setCurrentBoard}
						setArticleClicked={setArticleClicked}
					/>
					<section className={style.section}>
						{articleClicked ? (
							<ArticleDetail
								articleId={currentArticle}
								currentBoard={currentBoard}
								setArticleClicked={setArticleClicked}
							/>
						) : (
							<Board
								currentBoard={currentBoard}
								setArticleClicked={setArticleClicked}
								setCurrentArticle={setCurrentArticle}
							/>
						)}
					</section>
				</div>
				<p>{userInfo.username}</p>
				<Link to={`/profile/${userInfo.username}`} state={{ user: userInfo }}>
					Profile
				</Link>
			</div>
		)
	);
}

export default Main;
