import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Comments from "../comments/Comments";
import ArticleDetailButtons from "./ArticleDetailButtons";
import style from "../../style/articles/ArticleDetail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

function ArticleDetail() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const location = useLocation();
	const articleId = location.state.id;

	const [articleData, setArticleData] = useState();
	const [isLiked, setIsLiked] = useState();

	useEffect(() => {
		axios({
			url: `${SERVER_URL}/api/boards/articles/${articleId}`,
			method: "get",
		}).then((res) => {
			setArticleData(res.data);
		});
		getTotalLikes();
	}, [isLiked]);

	const getTotalLikes = () => {
		axios({
			url: `${SERVER_URL}/api/articles/${articleId}/likes`,
			method: "get",
		}).then((res) => {
			setIsLiked(res.data.is_liked);
		});
	};

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
			<section className={style.article_detail}>
				<nav>게시판 돌아가기</nav>
				{articleData && (
					<div className={style.article_detail_box}>
						<article className={style.article}>
							<div className={style.article_top}>
								<div className={style.profile}>
									<div className={style.profile_img}></div>
									<div>
										<p>{articleData.username}</p>
										<p>{articleData.created_at.slice(0, 10)}</p>
									</div>
								</div>
								<ArticleDetailButtons articleData={articleData} articleId={articleId} />
							</div>

							<h3 className={style.article_title}>{articleData.title}</h3>
							<p className={style.article_content}>{articleData.content}</p>

							<div className={style.article_bottom}>
								<div className={style.article_bottom_info}>
									<span style={{ marginRight: "0.4rem" }}>
										<FontAwesomeIcon icon={fasHeart} />
									</span>
									<span style={{ marginRight: "0.8rem" }}>{articleData.total_likes}</span>
									<span style={{ marginRight: "0.4rem" }}>
										<FontAwesomeIcon icon={faComment} />
									</span>
									<span>댓글 수</span>
								</div>
								<button className={style.heart_btn} onClick={handleHeartClick}>
									{isLiked ? (
										<FontAwesomeIcon icon={fasHeart} color="red" />
									) : (
										<FontAwesomeIcon icon={farHeart} color="gray" />
									)}
								</button>
							</div>
						</article>
						<Comments articleId={articleId} />
					</div>
				)}
			</section>
		</div>
	);
}

export default ArticleDetail;
