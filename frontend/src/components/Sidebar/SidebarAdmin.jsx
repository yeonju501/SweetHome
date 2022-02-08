import React from "react";
import { Link } from "react-router-dom";
import style from "../../style/Sidebar.module.css";

function SidebarAdmin() {
	return (
		<div className={style.sidebar_container}>
			<ul className={style.sidebar_list}>
				<li className={style.sidebar_back}>
					<Link className={style.sidebar_link} to="">
						👨‍👩‍👧‍👦회원 관리
					</Link>
				</li>
				<li className={style.sidebar_back}>
					<Link className={style.sidebar_link} to="">
						📚게시판 관리
					</Link>
				</li>
				<li className={style.sidebar_back}>
					<Link className={style.sidebar_link} to="">
						📋관리동의서
					</Link>
				</li>
				<li className={style.sidebar_back}>
					<Link className={style.sidebar_link} to="">
						🚧신고 게시글 관리
					</Link>
				</li>
				<li className={style.sidebar_back}>
					<Link className={style.sidebar_link} to="">
						🚧신고 댓글 관리
					</Link>
				</li>
			</ul>
		</div>
	);
}

export default SidebarAdmin;
