import React from "react";
import style from "style/Profile.module.css";

function AdminMemberNav({ active, setActive }) {
	const arr = ["아파트 회원", "신청 회원"];

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

export default AdminMemberNav;
