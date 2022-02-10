import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CreateBoard from "components/boards/CreateBoard";
import { Link } from "react-router-dom";
import axios from "axios";
import { SET_USER } from "store/user";
import style from "style/Main.module.css";
import { SET_POSITION } from "store/toggle";
import AgreementCreate from "components/agreements/AgreementCreate";

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
		});
		dispatch(SET_POSITION(toggle, "main"));
	}, []);

	return (
		userInfo && (
			<div>
				<CreateBoard />
				<div>최신글</div>
				<p>{userInfo.username}</p>
				<Link to={"/agreements"}>동의서</Link>
				<Link to={`/profile/${userInfo.username}`} state={{ user: userInfo }}>
					Profile
				</Link>
				<Link to="/admin">관리자</Link>
				<Link to="/site">사이트</Link>
			</div>
		)
	);
}

export default Main;
