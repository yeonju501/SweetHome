import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Error } from "assets/pageNotFound.svg";

function NotFound() {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				height: "100vh",
				fontSize: "2rem",
				textAlign: "center",
			}}
		>
			<h1>요청하신 페이지를 찾을 수 없습니다.</h1>
			<Link
				style={{ textDecoration: "none", color: "#0087e8", fontWeight: "700", margin: "3rem 0" }}
				to="/"
			>
				홈으로 돌아가기
			</Link>
			<Error style={{ margin: "0 auto" }} />
		</div>
	);
}

export default NotFound;
