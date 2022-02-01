import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Comments from "../comments/Comments";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ArticleDetail({ articleId, currentBoard, setArticleClicked }) {
	const token = useSelector((state) => state.token.token);

	const [articleData, setArticleData] = useState();

	useEffect(() => {
		axios({
			url: `${SERVER_URL}/api/boards/articles/${articleId}`,
			method: "get",
		}).then((res) => {
			setArticleData(res.data);
		});
	}, []);

	const handleDeleteButton = () => {
		axios({
			url: `${SERVER_URL}/api/boards/articles/${articleId}`,
			method: "delete",
		}).then(() => {
			setArticleClicked(false);
		});
	};

	return (
		<div>
			{articleData && (
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
							<button>수정</button>
							<button onClick={handleDeleteButton}>삭제</button>
						</div>
						<h3>{articleData.title}</h3>
						<p>{articleData.content}</p>
						<div>
							<span>{articleData.total_likes}</span>
							<span>댓글 수</span>
							<button>🤍</button>
						</div>
					</article>
				</div>
			)}
		</div>
	);
}

export default ArticleDetail;
