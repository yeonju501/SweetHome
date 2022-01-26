import React from "react";
import { useSelector } from "react-redux";

function Main() {
	const access = useSelector((state) => state.token.token);
	return <div>hi {access}</div>;
}

export default Main;
