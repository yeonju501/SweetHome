import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import style from "style/Sidebar.module.css";

function SidebarBoards() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const [boards, setBoards] = useState([]);
	const [favorites, setFavorites] = useState("");
	// const [isStarred, setIsStarred] = useState(false);

	useEffect(() => {
		getBoards();
		getFavorites();
	}, []);

	// const boardStarred = (boardId) => {
	// 	getStarred(boardId).then((value) => {
	// 		return value;
	// 	});
	// };

	const getStarred = async (boardId) => {
		const response = await axios({
			url: `${SERVER_URL}/api/boards/${boardId}/favorites`,
			method: "get",
		});
		return response.data.is_liked;
	};

	const handleStarClick = (boardId) => {
		getStarred(boardId).then((value) => {
			const method = value ? "delete" : "post";
			axios({
				url: `${SERVER_URL}/api/boards/${boardId}/favorites`,
				method: method,
			})
				.then(() => {
					getFavorites();
				})
				.catch((err) => console.log(err.response));
		});
	};

	const getBoards = () => {
		axios({
			url: `${SERVER_URL}/api/boards`,
			method: "get",
		}).then((res) => {
			setBoards(res.data);
		});
	};

	const getFavorites = () => {
		axios({
			url: `${SERVER_URL}/api/boards/favorites`,
			method: "get",
		}).then((res) => {
			setFavorites(res.data);
		});
	};

	return (
		<div className={style.sidebar_container}>
			<p className={style.sidebar_like}>⭐즐겨찾는 게시판</p>
			<ul className={style.sidebar_list}>
				{favorites &&
					favorites.map((favorite) => (
						<li className={style.sidebar_back} key={favorite.id}>
							<Link
								className={style.sidebar_link}
								to={`/boards/${favorite.id}`}
								state={{ favorite }}
							>
								{favorite.name}
							</Link>
						</li>
					))}
			</ul>
			<hr />
			<ul className={style.sidebar_list}>
				{boards &&
					boards.map((board) => (
						<div key={board.id}>
							<li className={style.sidebar_back}>
								<Link
									className={style.sidebar_link}
									to={`/boards/${board.id}`}
									state={{ board: board }}
								>
									{board.name}
								</Link>
							</li>
							<button
								onClick={() => {
									handleStarClick(board.id);
								}}
							>
								⭐
							</button>
						</div>
					))}
			</ul>
		</div>
	);
}

export default SidebarBoards;
