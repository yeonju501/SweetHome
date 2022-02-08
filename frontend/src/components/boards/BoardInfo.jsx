import axios from "axios";
import { useEffect, useState } from "react";

function BoardInfo({ board }) {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const [isStarred, setIsStarred] = useState(false);

	useEffect(() => {
		getStarred();
	});

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
		<div className="">
			<p>게시판명 : {board.name}</p>
			<p>게시판 소개글 : {board.Description}</p>
			<button onClick={handleStarClick}>{isStarred ? "⭐" : "☆"}</button>
		</div>
	);
}

export default BoardInfo;
