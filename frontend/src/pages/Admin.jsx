import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SET_POSITION } from "../store/toggle";

function Admin() {
	const dispatch = useDispatch();
	const toggle = useSelector((state) => state.toggle.toggleValue);
	useEffect(() => {
		dispatch(SET_POSITION(toggle, "admin"));
	}, []);
	return <></>;
}

export default Admin;
