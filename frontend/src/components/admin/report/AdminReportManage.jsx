import React, { useState } from "react";
import AdminReportArticleList from "./AdminReportArticleList";
import AdminReportCommentList from "./AdminReportCommentList";
import AdminReportNav from "./AdminReportNav";

function AdminReportManage() {
	const [active, setActive] = useState(0);
	return (
		<div>
			<h1>어드민 신고 관리</h1>

			<AdminReportNav active={active} setActive={setActive} />
			{active === 0 && <AdminReportArticleList />}
			{active === 1 && <AdminReportCommentList />}
		</div>
	);
}

export default AdminReportManage;
