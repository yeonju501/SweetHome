import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import style from "../style/Messages.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
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
