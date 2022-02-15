import React, { useState } from "react";
import AdminBoardNav from "./AdminBoardNav";
import AdminBoardRequestList from "./AdminBoardRequestList";
import AdminBoardList from "./AdminBoardList";
import style from "../../../style/Admin.module.css";

function AdminBoardManage() {
	const [active, setActive] = useState(0);
	return (
		<div className={style.manage_container}>
			<AdminBoardNav active={active} setActive={setActive} />
			{active === 0 && <AdminBoardList />}
			{active === 1 && <AdminBoardRequestList />}
		</div>
	);
}

export default AdminBoardManage;
