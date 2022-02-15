import React, { useState } from "react";
import AdminMemberList from "./AdminMemberList";
import AdminMemberNav from "./AdminMemberNav";
import AdminMemberRegister from "./AdminMemberRegister";
import style from "../../../style/Admin.module.css";

function AdminMemberManage() {
	const [active, setActive] = useState(0);
	return (
		<div className={style.manage_container}>
			<AdminMemberNav active={active} setActive={setActive} />
			{active === 0 && <AdminMemberList />}
			{active === 1 && <AdminMemberRegister />}
		</div>
	);
}

export default AdminMemberManage;
