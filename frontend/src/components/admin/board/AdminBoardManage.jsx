import React, { useState } from "react";
import AdminBoardNav from "./AdminBoardNav";
import AdminBoardRequestList from "./AdminBoardRequestList";
import AdminBoardList from "./AdminBoardList";

function AdminBoardManage() {
	const [active, setActive] = useState(0);
	return (
		<div>
			<h1>어드민 게시판 관리</h1>

			<AdminBoardNav active={active} setActive={setActive} />
			{active === 0 && <AdminBoardList />}
			{active === 1 && <AdminBoardRequestList />}
		</div>
	);
}

export default AdminBoardManage;
