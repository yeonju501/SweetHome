import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { SET_USER } from "store/user";
import style from "style/Main.module.css";
import { SET_POSITION } from "store/toggle";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Main() {
	const dispatch = useDispatch();
	const [userInfo, setUserInfo] = useState(null);
	const toggle = useSelector((state) => state.toggle.toggleValue);

	useEffect(() => {
		axios({
			url: `${SERVER_URL}/api/members/my-profile`,
			method: "get",
		}).then((res) => {
			setUserInfo(res.data);
			dispatch(SET_USER(res.data));
			console.log(res.data.authority);
		});
		dispatch(SET_POSITION(toggle, "main"));
	}, []);

	return (
		userInfo && (
			<div className={style.main}>
				<div>
					<p>인기글</p>
					<p>인기글</p>
					<p>인기글</p>
					<p>인기글</p>
					<p>인기글</p>
				</div>
				<hr />
				<div>
					<p>최신글</p>
					<p>최신글</p>
					<p>최신글</p>
					<p>최신글</p>
					<p>최신글</p>
				</div>
				<hr />
				<p>{userInfo.username}</p>
				<p>회원등급 : {userInfo.authority}</p>
				<Link to={"/agreements"}>동의서</Link>
				<Link to={`/profile/${userInfo.username}`} state={{ user: userInfo }}>
					Profile
				</Link>
				<Link to="/admin">관리자</Link>
			</div>
		)
	);
}

export default Main;
