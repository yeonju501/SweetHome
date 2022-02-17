import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "style/Sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SidebarStarIcon from "./SidebarStarIcon";
import CreateBoard from "components/boards/BoardCreate";

function SidebarBoards() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const user = useSelector((state) => state.userInfo);
	const [boards, setBoards] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		getFavorites();
		getBoards();
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
			url: `${SERVER_URL}/api/apts/${user.apt_house.apt.apt_id}/boards/${boardId}/favorites`,
			method: "get",
		});
		return response.data.is_liked;
	};

	const handleStarClick = (boardId) => {
		getStarred(boardId).then((value) => {
			const method = value ? "delete" : "post";
			axios({
				url: `${SERVER_URL}/api/apts/${user.apt_house.apt.apt_id}/boards/${boardId}/favorites`,
				method: method,
			})
				.then(() => {
					if (method === "delete") {
						getFavorites(true, boardId);
						return;
					}
					getFavorites();
					clickStarIcon(boardId);
				})
				.catch((err) => console.log(err.response));
		});
	};
	const getFavorites = async (isDelete = false, boardId) => {
		const response = axios({
			url: `${SERVER_URL}/api/apts/${user.apt_house.apt.apt_id}/boards/favorites`,
			method: "get",
		}).then((res) => {
			if (isDelete) {
				setFavorites(res.data);
				getBoards(true, boardId);
				return res.data;
			}
			setFavorites(res.data);
			return res.data;
		});
		return response;
	};

	const getBoards = (isDelete = false, boardId = "") => {
		getFavorites().then((value) => {
			axios({
				url: `${SERVER_URL}/api/apts/${user.apt_house.apt.apt_id}/boards`,
				method: "get",
			}).then((res) => {
				if (isDelete) {
					const newBoard = res.data.filter((board) => board.id === boardId);
					setBoards((prev) => [...prev, ...newBoard]);
					return;
				}
				if (value) {
					const favorId = value.map((favor) => favor.id);
					const boards = res.data;
					const selected = boards.filter((board) => !favorId.includes(board.id));
					setBoards(selected);
					return;
				}
				setBoards(res.data);
			});
		});
	};

	function clickStarIcon(boardId) {
		const unStarBoards = boards.filter((board) => board.id !== boardId);
		setBoards(unStarBoards);
	}

	{
		if (user.authority !== "어드민") {
			return (
				<div className={style.sidebar_container}>
					{modalOpen && <CreateBoard isOpen={modalOpen} onCancel={handleModal} />}
					<div
						className={style.request_new_board}
						onClick={() => setModalOpen(true)}
						style={{ cursor: "pointer" }}
					>
						<FontAwesomeIcon className={style.icon} icon={faPlus} />
						<span>게시판 생성 요청</span>
					</div>

					<p className={style.sidebar_like}>즐겨찾는 게시판</p>
					<ul className={style.sidebar_list}>
						{favorites &&
							favorites.map((favorite) => (
								<li className={style.fav_sidebar_back} key={favorite.id}>
									<Link
										className={style.sidebar_link}
										to={`/boards/${favorite.id}`}
										state={{ favorite }}
									>
										{favorite.name}
									</Link>
									<span onClick={() => handleStarClick(favorite.id)} className={style.star_btn}>
										<SidebarStarIcon status={true} />
									</span>
								</li>
							))}
					</ul>
					<hr style={{ width: "85%", margin: "2rem 0" }} />
					<p className={style.sidebar_agreements}>
						<Link to={`/agreements`}>동의서 게시판</Link>
					</p>
					<ul className={style.sidebar_list}>
						{boards.length > 0 &&
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
										<SidebarStarIcon status={false} />
									</span>
								</div>
							))}
					</ul>
				</div>
			);
		} else {
			return <div style={{ display: "none" }}>h</div>;
		}
	}
}

export default SidebarBoards;
