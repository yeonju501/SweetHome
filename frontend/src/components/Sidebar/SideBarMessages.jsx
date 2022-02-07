import React from "react";
import { Link } from "react-router-dom";
import style from "../../style/Sidebar.module.css";

function SidebarMessage() {
	return (
		<div className={style.sidebar_container}>
			<ul className={style.sidebar_list}>
				<li className={style.sidebar_back}>
					<Link className={style.sidebar_link} to="read-receive-message">
						받은 메시지
					</Link>
				</li>
				<li className={style.sidebar_back}>
					<Link className={style.sidebar_link} to="read-send-message">
						보낸 메시지
					</Link>
				</li>
				<li className={style.sidebar_back}>
					<Link className={style.sidebar_link} to="send-message">
						메시지 보내기
					</Link>
				</li>
			</ul>
		</div>
	);
}

export default SidebarMessage;