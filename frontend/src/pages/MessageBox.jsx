import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_POSITION } from "../store/toggle";

function MessageBox() {
	const dispatch = useDispatch();
	const toggle = useSelector((state) => state.toggle.toggleValue);
	useEffect(() => {
		dispatch(SET_POSITION(toggle, "message"));
	});
	return <></>;
}

export default MessageBox;
