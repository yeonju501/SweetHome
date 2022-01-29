import React from "react";
import { useSelector } from "react-redux";

function ReadMessageDeatil() {
	const token = useSelector((state) => state.token.token);

	return (
		<div>
			<h1>ReadMessageDetail</h1>
		</div>
	);
}

export default ReadMessageDeatil;
