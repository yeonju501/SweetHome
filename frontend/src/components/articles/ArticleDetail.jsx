import { useEffect, useState } from "react";
import axios from "axios";
import Comments from "../comments/Comments";
import ArticleUpdate from "./ArticleUpdate";
import ArticleDetailButtons from "./ArticleDetailButtons";

function ArticleDetail({ articleId, currentBoard, setArticleClicked }) {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const [articleData, setArticleData] = useState();
	const [update, setUpdate] = useState(false);
	const [isLiked, setIsLiked] = useState();

	useEffect(() => {
		axios({
			url: `${SERVER_URL}/api/boards/articles/${articleId}`,
			method: "get",
		}).then((res) => {
			setArticleData(res.data);
		});
		axios({
			url: `${SERVER_URL}/api/articles/${articleId}/likes`,
			method: "get",
		}).then((res) => {
			setIsLiked(res.data.is_liked);
		});
	}, [articleData]);

	const handleHeartClick = () => {
		const method = isLiked ? "delete" : "post";

		axios({
			url: `${SERVER_URL}/api/articles/${articleId}/likes`,
			method: method,
		}).then(() => {
			setIsLiked((prev) => !prev);
		});
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
							<ArticleDetailButtons
								articleData={articleData}
								articleId={articleId}
								setArticleClicked={setArticleClicked}
								setUpdate={setUpdate}
							/>
							<h3>{articleData.title}</h3>
							<p>{articleData.content}</p>
							<div>
								<span>{articleData.total_likes}</span>
								<span>댓글 수</span>
								<button onClick={handleHeartClick}>{isLiked ? "💗" : "🤍"}</button>
							</div>
						</article>
						<Comments articleId={articleId} />
					</div>
				))}
		</div>
	);
}

export default ArticleDetail;
