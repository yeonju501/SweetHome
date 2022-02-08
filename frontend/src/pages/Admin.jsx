import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function Admin() {
	const dispatch = useDispatch();
	const toggle = useSelector((state) => state.toggle.toggleValue);
	useEffect(() => {});
	return <></>;
}

export default Admin;
