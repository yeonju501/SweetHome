import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BoardList from "../components/BoardList";
import CreateBoard from "../components/CreateBoard";
import Board from "../components/Board";
import ArticleDetail from "../components/articles/ArticleDetail";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { SET_USER } from "../store/user";

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
		})
			.then((res) => {
				setBoards(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		userInfo && (
			<div>
				<div>nav-bar</div>
				<Navbar />
				<CreateBoard />
				<BoardList boards={boards} setCurrentBoard={setCurrentBoard} />
				{articleClicked ? (
					<ArticleDetail currentArticle={currentArticle} />
				) : (
					<Board currentBoard={currentBoard} setArticleClicked={setArticleClicked} />
				)}
				<p>{userInfo.username}</p>
				<Link to={`/profile/${userInfo.username}`} state={{ user: userInfo }}>
					Profile
				</Link>
				<Link to="/message-box/">MessageBox</Link>
			</div>
		)
	);
}

export default Main;
