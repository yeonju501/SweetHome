import React from "react";
import style from "../../../style/Admin.module.css";

function AdminReportNav({ active, setActive }) {
	const arr = ["신고 게시글 관리", "신고 댓글 관리"];

	return (
		<div>
			<ul className={style.nav}>
				{arr.map((item, idx) => (
					<li
						className={active === idx ? style.active : style.deactive}
						key={idx}
						onClick={() => setActive(idx)}
					>
						{item}
					</li>
				))}
			</ul>
		</div>
	);
}

export default AdminReportNav;
