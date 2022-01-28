import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BoardList from "../components/BoardList";
import { Link } from "react-router-dom";
import axios from "axios";

function Main() {
	const token = useSelector((state) => state.token.token);
	const [userInfo, setUserInfo] = useState(null);

	useEffect(() => {
		axios({
			url: "http://localhost:8080/api/members/my-profile",
			method: "get",
			headers: { Authorization: `Bearer ${token}` },
		}).then((res) => setUserInfo(res.data));
	}, []);

	return (
		userInfo && (
			<div>
				hi {token}
				<div>nav-bar</div>
				<BoardList />
				<div>글 목록</div>
				<p>{userInfo.username}</p>
				<Link to={`/profile/${userInfo.username}`} state={{ user: userInfo }}>
					Profile
				</Link>
			</div>
		)
	);
}

export default Main;
