import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { SET_USER } from "store/user";
import { SET_POSITION } from "store/toggle";
import AssoMemberpage from "./Authority/AssoMemberpage";
import style from "style/Main.module.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Main() {
	const dispatch = useDispatch();
	const [userInfo, setUserInfo] = useState(null);
	const toggle = useSelector((state) => state.toggle.toggleValue);
	const [newArticles, setNewArticles] = useState([]);

	useEffect(() => {
		try {
			axios({
				url: `${SERVER_URL}/api/members/my-profile`,
				method: "get",
			}).then((res) => {
				setUserInfo(res.data);
				dispatch(SET_USER(res.data));
			});
			dispatch(SET_POSITION(toggle, "main"));
		} catch (err) {
			console.log(err);
		}
	}, []);

	useEffect(() => {
		if (userInfo && userInfo.authority !== "준회원") {
			getNewArticles();
		}
	}, [userInfo]);

	const getNewArticles = () => {
		axios({
			url: `${SERVER_URL}/api/apts/${userInfo.apt_house.apt.apt_id}/boards/articles/new`,
			method: "get",
		})
			.then((res) => {
				setNewArticles(res.data);
			})
			.catch((err) => console.log(err.response));
	};

	return (
		userInfo &&
		(userInfo.authority === "준회원" ? (
			<AssoMemberpage />
		) : (
			<div className={style.body}>
				<p className={style.new_articles_p}>최신글</p>
				<ul className={style.articles}>
					{newArticles.map((article, idx) => (
						<div className={style.new_articles} key={idx}>
							<li>{article.board_name}</li>
							<li className={style.article}>
								<Link
									to={`/articles/${article.article_id}`}
									state={{
										articleId: article.article_id,
										board: { id: article.board_id, name: article.board_name },
									}}
								>
									{article.title}
								</Link>
							</li>
						</div>
					))}
				</ul>
			</div>
		))
	);
}

export default Main;
