import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Comments from "../comments/Comments";
import ArticleUpdate from "./ArticleUpdate";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ArticleDetail({ articleId, currentBoard, setArticleClicked }) {
	const [articleData, setArticleData] = useState();
	const [update, setUpdate] = useState(false);

	useEffect(() => {
		axios({
			url: `${SERVER_URL}/api/boards/articles/${articleId}`,
			method: "get",
		}).then((res) => {
			setArticleData(res.data);
		});
	}, [update]);

	const handleDeleteButtonClick = () => {
		axios({
			url: `${SERVER_URL}/api/boards/articles/${articleId}`,
			method: "delete",
		}).then(() => {
			setArticleClicked(false);
		});
	};

	const handleUpdateButtonClick = () => {
		setUpdate(true);
	};

	return (
		<div>
			<nav>nav-bar</nav>
			{articleData &&
				(update ? (
					<ArticleUpdate articleId={articleId} setUpdate={setUpdate} />
				) : (
					<div>
						<div>{currentBoard.name}</div>
						<article>
							<div>
								<p>{articleData.username}</p>
								<p>{articleData.created_at}</p>
							</div>
							<div>
								<button>쪽지</button>
								<button>신고</button>
							</div>
							<div>
								<button onClick={handleUpdateButtonClick}>수정</button>
								<button onClick={handleDeleteButtonClick}>삭제</button>
							</div>
							<h3>{articleData.title}</h3>
							<p>{articleData.content}</p>
							<div>
								<span>{articleData.total_likes}</span>
								<span>댓글 수</span>
								<button>🤍</button>
							</div>
						</article>
						<Comments articleId={articleId} />
					</div>
				))}
		</div>
	);
}

export default ArticleDetail;
