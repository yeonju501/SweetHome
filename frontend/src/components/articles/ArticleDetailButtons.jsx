import { useSelector } from "react-redux";
import axios from "axios";

function ArticleDetailButtons({ articleData, articleId, setUpdate, setArticleClicked }) {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const username = useSelector((state) => state.userInfo.username);

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
			{articleData.username === username ? (
				<div>
					<button onClick={handleUpdateButtonClick}>수정</button>
					<button onClick={handleDeleteButtonClick}>삭제</button>
				</div>
			) : (
				<div>
					<button>쪽지</button>
					<button>신고</button>
				</div>
			)}
		</div>
	);
}

export default ArticleDetailButtons;
