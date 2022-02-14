import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "style/Sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlus } from "@fortawesome/free-solid-svg-icons";
import CreateBoard from "../boards/BoardCreate";

function SidebarBoards() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const user = useSelector((state) => state.userInfo.apt_house);
	const [boards, setBoards] = useState([]);
	const [favorites, setFavorites] = useState("");
	// const [isStarred, setIsStarred] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		getBoards();
		getFavorites();
		if (modalOpen) {
			document.body.style.cssText = `
		position: fixed; 
		top: -${window.scrollY}px;
		overflow-y: scroll;
		width: 100%;`;
			return () => {
				const scrollY = document.body.style.top;
				document.body.style.cssText = "";
				window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
			};
		}
	}, []);

	const handleModal = () => {
		setModalOpen(false);
	};

	const getStarred = async (boardId) => {
		const response = await axios({
			url: `${SERVER_URL}/api/apts/${user.apt.apt_id}/boards/${boardId}/favorites`,
			method: "get",
		});
		return response.data.is_liked;
	};

	const handleStarClick = (boardId) => {
		getStarred(boardId).then((value) => {
			const method = value ? "delete" : "post";
			axios({
				url: `${SERVER_URL}/api/apts/${user.apt.apt_id}/boards/${boardId}/favorites`,
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
			url: `${SERVER_URL}/api/apts/${user.apt.apt_id}/boards`,
			method: "get",
		}).then((res) => {
			setBoards(res.data);
		});
	};

	const getFavorites = () => {
		axios({
			url: `${SERVER_URL}/api/apts/${user.apt.apt_id}/boards/favorites`,
			method: "get",
		}).then((res) => {
			setFavorites(res.data);
		});
	};

	return (
		<div className={style.sidebar_container}>
			{modalOpen && <CreateBoard isOpen={modalOpen} onCancel={handleModal} />}
			<p>
				<FontAwesomeIcon onClick={() => setModalOpen(true)} className={style.icon} icon={faPlus} />
				게시판 생성 요청
			</p>

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
						<div key={board.id} className={style.board_name_star}>
							<li className={style.sidebar_back}>
								<Link
									className={style.sidebar_link}
									to={`/boards/${board.id}`}
									state={{ board: board }}
								>
									{board.name}
								</Link>
							</li>
							<span
								onClick={() => {
									handleStarClick(board.id);
								}}
								className={style.star_btn}
							>
								<FontAwesomeIcon icon={faStar} color="#FFCB14"></FontAwesomeIcon>
							</span>
						</div>
					))}
			</ul>
		</div>
	);
}

export default SidebarBoards;
