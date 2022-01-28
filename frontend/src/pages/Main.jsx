import React from "react";
import { useSelector } from "react-redux";
import BoardList from "../components/BoardList";
import { Link } from "react-router-dom";

function Main() {
	const token = useSelector((state) => state.token.token);
	const [userInfo, setUserInfo] = useState(null);

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
