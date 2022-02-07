import React from "react";
import { Link } from "react-router-dom";
import style from "../style/Messages.module.css";

function SidebarMessage() {
	return (
		<div className={style.message_box_container}>
			<div>
				<ul>
					<li className={style.li_link}>
						<Link className={style.link} to="read-receive-message">
							받은 메시지
						</Link>
					</li>
					<li className={style.li_link}>
						<Link className={style.link} to="read-send-message">
							보낸 메시지
						</Link>
					</li>
					<li className={style.li_link}>
						<Link className={style.link} to="send-message">
							메시지 보내기
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default SidebarMessage;
