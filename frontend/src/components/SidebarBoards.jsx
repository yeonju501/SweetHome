import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
		<div>
			<p>즐겨찾는 게시판</p>
			<ul>
				{favorites &&
					favorites.map((favorite) => (
						<li key={favorite.id}>
							<Link to={`/boards/${favorite.id}`} state={{ favorite }}>
								{favorite.name}
							</Link>
						</li>
					))}
			</ul>
			<hr />
			<ul>
				{boards.map((board) => (
					<li key={board.id}>
						<Link to={`/boards/${board.id}`} state={{ board: board }}>
							{board.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export default SidebarBoards;
