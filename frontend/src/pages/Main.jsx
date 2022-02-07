import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CreateBoard from "../components/boards/CreateBoard";
import { Link } from "react-router-dom";
import axios from "axios";
import { SET_USER } from "../store/user";
import style from "../style/Main.module.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Main() {
	const dispatch = useDispatch();
	const [userInfo, setUserInfo] = useState(null);

	useEffect(() => {
		axios({
			url: `${SERVER_URL}/api/members/my-profile`,
			method: "get",
		}).then((res) => {
			setUserInfo(res.data);
			dispatch(SET_USER(res.data));
		});
	}, []);

	return (
		userInfo && (
			<div>
				<CreateBoard />
				<div>최신글</div>
				<p>{userInfo.username}</p>
				<Link to={`/profile/${userInfo.username}`} state={{ user: userInfo }}>
					Profile
				</Link>
			</div>
		)
	);
}

export default Main;
