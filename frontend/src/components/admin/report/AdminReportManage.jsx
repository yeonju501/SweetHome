import React, { useState } from "react";
import AdminReportArticleList from "./AdminReportArticleList";
import AdminReportCommentList from "./AdminReportCommentList";
import AdminReportNav from "./AdminReportNav";
import style from "../../../style/Admin.module.css";

function AdminReportManage() {
	const [active, setActive] = useState(0);
	return (
		<div className={style.manage_container}>
			<AdminReportNav active={active} setActive={setActive} />
			{active === 0 && <AdminReportArticleList />}
			{active === 1 && <AdminReportCommentList />}
		</div>
	);
}

export default AdminReportManage;
