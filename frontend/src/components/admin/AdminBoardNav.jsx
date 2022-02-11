import React from "react";
import style from "style/Profile.module.css";

function AdminBoardNav({ active, setActive }) {
	const arr = ["게시판 목록", "게시판 신청 목록"];

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

export default AdminBoardNav;
