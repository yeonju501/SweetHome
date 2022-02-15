import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Comments from "../comments/Comments";
import ArticleDetailButtons from "./ArticleDetailButtons";
import style from "style/articles/ArticleDetail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import anonymous from "assets/anonymous.jpg";

function ArticleDetail() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const location = useLocation();
	const articleId = location.state.articleId;
	const board = location.state.board;
	const [article, setArticle] = useState();
	const [isLiked, setIsLiked] = useState();
	const [comment, setComment] = useState(0);
	const user = useSelector((state) => state.userInfo.apt_house);

	useEffect(() => {
		axios({
			url: `${SERVER_URL}/api/apts/${user.apt.apt_id}/boards/articles/${articleId}`,
			method: "get",
		}).then((res) => {
			setArticle(res.data);
			setComment(res.data.total_replies);
		});
		getIsLiked();
	}, [isLiked, comment]);

	const getIsLiked = () => {
		axios({
			url: `${SERVER_URL}/api/apts/${user.apt.apt_id}/articles/${articleId}/likes`,
			method: "get",
		}).then((res) => {
			setIsLiked(res.data.is_liked);
		});
	};

	const handleHeartClick = () => {
		const method = isLiked ? "delete" : "post";

		axios({
			url: `${SERVER_URL}/api/apts/${user.apt.apt_id}/articles/${articleId}/likes`,
			method: method,
		}).then(() => {
			setIsLiked((prev) => !prev);
		});
	};

	const setArticleUserImg = () => {
		const articleUserImg = article.user_image ? article.user_image : anonymous;
		return articleUserImg;
	};

	return (
		<div>
			{article && (
				<section className={style.article_detail}>
					<div className={style.article_to_board}>
						<Link to={`/boards/${board.id}`} state={{ board: board }}>
							{board.name}
						</Link>
					</div>

					<div className={style.article_comment_box}>
						<article className={style.article}>
							<div className={style.article_top}>
								<div className={style.profile}>
									<div className={style.profile_img}>
										<img src={setArticleUserImg()} alt="profile" />
									</div>
									<div>
										<p>{article.username}</p>
										<p>{article.created_at.slice(0, 10)}</p>
									</div>
								</div>
								<ArticleDetailButtons article={article} articleId={articleId} />
							</div>

							<h3 className={style.article_title}>{article.title}</h3>
							{article.image_url && (
								<div className={style.article_img}>
									<img src={article.image_url} alt="article" />
								</div>
							)}
							<p className={style.article_content}>{article.content}</p>

							<div className={style.article_bottom}>
								<div className={style.article_bottom_info}>
									<FontAwesomeIcon icon={fasHeart} color="#888888" size="lg" />
									<span style={{ marginRight: "0.8rem" }}>{article.total_likes}</span>
									<FontAwesomeIcon icon={faComment} color="#595959" size="lg" />
									<span>{comment}</span>
								</div>
								<button className={style.heart_btn} onClick={handleHeartClick}>
									{isLiked ? (
										<FontAwesomeIcon icon={fasHeart} color="red" size="2x" />
									) : (
										<FontAwesomeIcon icon={fasHeart} color="#dedede" size="2x" />
									)}
								</button>
							</div>
						</article>
						<Comments articleId={articleId} totalComments={comment} setComment={setComment} />
					</div>
				</section>
			)}
		</div>
	);
}

export default ArticleDetail;
