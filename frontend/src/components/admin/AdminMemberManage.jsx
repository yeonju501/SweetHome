import React from "react";
import { useState } from "react";
import AdminMemberList from "./AdminMemberList";
import AdminMemberNav from "./AdminMemberNav";
import AdminMemberRegister from "./AdminMemberRegister";

function AdminMemberManage() {
	const [active, setActive] = useState(0);
	return (
		<div>
			<h1>어드민 멤버 관리</h1>

			<AdminMemberNav active={active} setActive={setActive} />
			{active === 0 && <AdminMemberList />}
			{active === 1 && <AdminMemberRegister />}
		</div>
	);
}

export default AdminMemberManage;
