import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_POSITION } from "../store/toggle";
import { getReceiveMessageCount } from "../utils/messagesFunction";

function MessageBox() {
	const dispatch = useDispatch();
	const toggle = useSelector((state) => state.toggle.toggleValue);
	const [receiveMessageCnt, setReceiveMessageCnt] = useState({
		all_count: "",
		unread_count: "",
	});
	useEffect(() => {
		dispatch(SET_POSITION(toggle, "message"));
		getReceiveMessageCount(setReceiveMessageCnt);
	});
	return (
		<>
			<p>받은 메시지 : {receiveMessageCnt.all_count}</p>
			<p>안 읽은 메시지 : {receiveMessageCnt.unread_count}</p>
		</>
	);
}

export default MessageBox;
