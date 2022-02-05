import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
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

	return (
		<div>
			{articleData.username === username ? (
				<div>
					<Link to={`/articles/${articleId}/update`} state={{ articleId }}>
						수정
					</Link>
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
