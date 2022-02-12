import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "style/Sidebar.module.css";

function SidebarAdmin() {
	const authority = useSelector((state) => state.userInfo.authority);
	return (
		<div className={style.sidebar_container}>
			<ul className={style.sidebar_list}>
				<li className={style.sidebar_back}>
					{authority === "아파트관리자" ? (
						<Link className={style.sidebar_link} to="member-manage">
							👨‍👩‍👧‍👦회원 관리
						</Link>
					) : (
						<Link className={style.sidebar_link} to="site">
							👨‍👩‍👧‍👦아파트 관리자 관리
						</Link>
					)}
				</li>
				<li className={style.sidebar_back}>
					<Link className={style.sidebar_link} to="board-manage">
						📚게시판 관리
					</Link>
				</li>
				<li className={style.sidebar_back}>
					<Link className={style.sidebar_link} to="">
						📋관리동의서
					</Link>
				</li>
				<li className={style.sidebar_back}>
					<Link className={style.sidebar_link} to="report-manage">
						🚧신고 관리
					</Link>
				</li>
			</ul>
		</div>
	);
}

export default SidebarAdmin;
