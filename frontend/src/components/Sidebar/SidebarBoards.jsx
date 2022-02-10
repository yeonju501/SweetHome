import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import style from "style/Sidebar.module.css";

function SidebarBoards() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const [boards, setBoards] = useState([]);
	const [favorites, setFavorites] = useState("");

	useEffect(() => {
		getBoards();
		getFavorites();
	}, []);

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
				{boards.map((board) => (
					<li className={style.sidebar_back} key={board.id}>
						<Link
							className={style.sidebar_link}
							to={`/boards/${board.id}`}
							state={{ board: board }}
						>
							{board.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export default SidebarBoards;
