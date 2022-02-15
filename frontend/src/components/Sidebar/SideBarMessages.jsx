import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SET_MESSAGE } from "store/message";
import style from "style/Sidebar.module.css";
import { getUnReadMessageCount } from "utils/messagesFunction";

function SidebarMessage() {
	const [unReadMessage, setUnReadMessage] = useState("");
	const dispatch = useDispatch();
	useEffect(() => {
		getUnReadMessageCount(setUnReadMessage);
	}, []);

	const fromSideBar = async () => {
		await dispatch(
			SET_MESSAGE({
				username: "",
			}),
		);
	};
	return (
		<div className={style.sidebar_container}>
			<ul className={style.sidebar_list}>
				<li className={style.sidebar_back}>
					<Link className={style.sidebar_link} to="messages" state={{ to: "inbox" }}>
						📥받은 메시지 {unReadMessage.unread_count}
					</Link>
				</li>
				<li className={style.sidebar_back}>
					<Link className={style.sidebar_link} to="messages" state={{ to: "sendBox" }}>
						📤보낸 메시지
					</Link>
				</li>
				<li className={style.sidebar_back}>
					<Link className={style.sidebar_link} to="send-message" onClick={fromSideBar}>
						📝메시지 보내기
					</Link>
				</li>
			</ul>
		</div>
	);
}

export default SidebarMessage;
