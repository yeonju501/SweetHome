import { useDispatch, useSelector } from "react-redux";
import { SET_REPORT } from "store/report";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import style from "style/articles/ArticleDetailButtons.module.css";
import ArticleCreateForm from "./ArticleCreateForm";

function ArticleDetailButtons({ article, articleId }) {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const usermail = useSelector((state) => state.userInfo.email);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleDeleteButtonClick = async () => {
		if (window.confirm("글을 삭제 하시겠습니까?")) {
			axios({
				url: `${SERVER_URL}/api/boards/articles/${articleId}`,
				method: "delete",
			}).then(() => {
				navigate(-1);
			});
		}
	};

	const reportArticle = async () => {
		await dispatch(
			SET_REPORT({
				...article,
				id: articleId,
				type: "articles",
			}),
		);
		await window.open("/report", "report", "width=430, height=500,location=no,status=no");
	};

	return (
		<div className={style.button_box}>
			{article.email === usermail ? (
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
					<button onClick={reportArticle}>신고</button>
				</div>
			)}
		</div>
	);
}

export default ArticleDetailButtons;
