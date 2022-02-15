import MessageBox from "components/messages/MessageBox";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_POSITION } from "store/toggle";
import { getReceiveMessageCount, getSendMessageCount } from "utils/messagesFunction";
import style from "style/Messages.module.css";
function Message() {
	const dispatch = useDispatch();
	const toggle = useSelector((state) => state.toggle.toggleValue);
	const [receiveMessageCnt, setReceiveMessageCnt] = useState({
		all_count: "",
		unread_count: "",
	});
	const [sendMessageCnt, setSendMessageCnt] = useState({
		all_count: "",
	});
	useEffect(() => {
		dispatch(SET_POSITION(toggle, "message"));
		getReceiveMessageCount(setReceiveMessageCnt);
		getSendMessageCount(setSendMessageCnt);
	}, []);
	return (
		<div className={style.Message_div}>
			<div className={style.message_nav}>
				<p>
					<span> 받은 메시지</span> : {receiveMessageCnt.all_count}
				</p>
				<p>
					<span> 안 읽은 메시지</span> : {receiveMessageCnt.unread_count}
				</p>
				<p>
					<span> 보낸 메시지</span> : {sendMessageCnt.all_count}
				</p>
			</div>
			<MessageBox action="receiver" />
		</div>
	);
}

export default Message;
