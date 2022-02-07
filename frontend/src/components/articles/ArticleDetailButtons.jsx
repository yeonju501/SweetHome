import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import style from "../../style/articles/ArticleDetailButtons.module.css";

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
		<div className={style.button_box}>
			{articleData.username === username ? (
				<div>
					<Link
						to={`/articles/${articleId}/update`}
						state={{ articleId }}
						className={style.buttons}
					>
						수정
					</Link>
					<button onClick={handleDeleteButtonClick} className={style.buttons}>
						삭제
					</button>
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
