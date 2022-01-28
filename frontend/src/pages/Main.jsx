import React from "react";
import { useSelector } from "react-redux";
import BoardList from "../components/BoardList";

function Main() {
	const access = useSelector((state) => state.token.token);
	return (
		<div>
			hi {access}
			<div>nav-bar</div>
			<BoardList />
			<div>글 목록</div>
		</div>
	);
}

export default Main;
