import AdminMemberList from "components/admin/member/AdminMemberList";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SET_POSITION } from "store/toggle";

function Admin() {
	const dispatch = useDispatch();
	const toggle = useSelector((state) => state.toggle.toggleValue);
	useEffect(() => {
		dispatch(SET_POSITION(toggle, "admin"));
	}, []);
	return (
		<div style={{ margin: "3rem 0" }}>
			<h1>Admin Page</h1>
			<AdminMemberList />
		</div>
	);
}

export default Admin;
