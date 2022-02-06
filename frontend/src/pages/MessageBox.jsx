import React from "react";
import { Link, Outlet } from "react-router-dom";
import style from "../style/Messages.module.css";

function MessageBox() {
	return (
		<div>
			<h1>MessageBox</h1>
			<div>
				<div className={style.side}>
					<ul>
						<li>
							<Link className={style.link} to="read-receive-message">
								받은 메시지
							</Link>
						</li>
						<li>
							<Link className={style.link} to="read-send-message">
								보낸 메시지
							</Link>
						</li>
						<li>
							<Link className={style.link} to="send-message">
								메시지 보내기
							</Link>
						</li>
					</ul>
				</div>
				<div className={style.main}>
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default MessageBox;
