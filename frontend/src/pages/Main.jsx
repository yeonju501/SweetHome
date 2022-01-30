import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BoardList from "../components/BoardList";
import CreateBoard from "../components/CreateBoard";
import { Link } from "react-router-dom";
import axios from "axios";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Main() {
	const token = useSelector((state) => state.token.token);
	const [userInfo, setUserInfo] = useState(null);
	const [boards, setBoards] = useState([]);

	useEffect(() => {
		axios({
			url: `${SERVER_URL}/api/members/my-profile`,
			method: "get",
			headers: { Authorization: `Bearer ${token}` },
		}).then((res) => setUserInfo(res.data));
	}, []);

	useEffect(() => {
		axios({
			url: `${SERVER_URL}/api/boards`,
			headers: { Authorization: `Bearer ${token}` },
			method: "get",
		})
			.then((res) => {
				console.log(res);
				setBoards(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		userInfo && (
			<div>
				hi {token}
				<div>nav-bar</div>
				<CreateBoard />
				<BoardList boards={boards} />
				<div>글 목록</div>
				<p>{userInfo.username}</p>
				<Link to={`/profile/${userInfo.username}`} state={{ user: userInfo }}>
					Profile
				</Link>
				<Link to="/message-box/">MessageBox</Link>
			</div>
		)
	);
}

export default Main;
