import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import CreateArticle from "./articles/CreateArticle";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Board({ currentBoard }) {
	const token = useSelector((state) => state.token.token);
	const [articles, setArticles] = useState([]);

	return (
		<div>
			<div>
				<p>{currentBoard.name}</p>
				<p>{currentBoard.description}</p>
			</div>
			<CreateArticle boardId={currentBoard.id}/>
			<div>게시글 목록</div>
		</div>
	);
}

export default Board;
