import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ArticleDetailButtons({ articleData, articleId }) {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const username = useSelector((state) => state.userInfo.username);
	const navigate = useNavigate();

	const handleDeleteButtonClick = () => {
		axios({
			url: `${SERVER_URL}/api/boards/articles/${articleId}`,
			method: "delete",
		}).then(() => {
			navigate(-1);
		});
	};

	const handleUpdateButtonClick = () => {};

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
