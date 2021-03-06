import React from "react";
import style from "style/Profile.module.css";

function ProfileNav({ active, setActive }) {
	const arr = ["회원정보", "내가 작성한 글", "내가 작성한 댓글", "내가 좋아요한 글", "이사가기"];

	return (
		<div className={style.profile_nav}>
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

export default ProfileNav;
