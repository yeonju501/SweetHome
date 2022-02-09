import React from "react";
import AdminMemberList from "./AdminMemberList";
import AdminMemberRegister from "./AdminMemberRegister";

function AdminMemberManage() {
	return (
		<>
			<h1>어드민 멤버 관리</h1>
			<h3>회원등록</h3>
			<AdminMemberRegister />
			<hr />
			<h3>회원조회</h3>
			<AdminMemberList />
		</>
	);
}

export default AdminMemberManage;
