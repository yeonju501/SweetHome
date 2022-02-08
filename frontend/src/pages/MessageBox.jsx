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
		unread_count: "",
		all_count: "",
	});
	useEffect(() => {
		dispatch(SET_POSITION(toggle, "message"));
		getReceiveMessageCount(setReceiveMessageCnt);
	});
	return <>{receiveMessageCnt}</>;
}

export default MessageBox;
