import React, { useState } from "react";
import AdminReportArticleList from "./AdminReportArticleList";
import AdminReportCommentList from "./AdminReportCommentList";
import AdminReportNav from "./AdminreportNav";

function AdminReportManage() {
	const [active, setActive] = useState(0);
	return (
		<>
			<h1>어드민 신고 관리</h1>
			<AdminReportNav active={active} setActive={setActive} />
			{active === 0 && <AdminReportArticleList />}
			{active === 0 && <AdminReportCommentList />}
		</>
	);
}

export default AdminReportManage;
