import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import style from "../style/Profile.module.css";

function Profile() {
	const location = useLocation();
	const user = location.state.user;
	const arr = ["회원정보", "내가 작성한 글", "내가 작성한 댓글", "내가 좋아요한 글"];
	const [active, setActive] = useState(-1);
	const [userInfo, setUserInfo] = useState({
		email: user.email,
		username: user.username,
		phone_number: user.phone_number,
	});
	const onChange = (e) => {
		setUserInfo({ ...userInfo, [e.target.id]: e.target.value });
	};

	const { email, username, phone_number } = userInfo;

	return (
		<div className={style.profile}>
			<div className={style.profile_user}>
				<img src="" alt="Profile img" className={style.profile_img} />
				<div>
					<h1 className={style.title}>{user.username}</h1>
					<p className={style.email}>{user.email}</p>
				</div>
			</div>
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

			<form>
				<label htmlFor="username">닉네임</label>
				<input type="text" id="username" value={username} onChange={onChange} />
				<label htmlFor="email">Email</label>
				<input type="text" id="email" value={email} onChange={onChange} />
				<label htmlFor="phone_number">휴대폰 번호</label>
				<input type="text" id="phone_number" value={phone_number} onChange={onChange} />
				<label htmlFor="address">주소</label>
				<input type="text" id="address" onChange={onChange} />
				<button>저장</button>
			</form>
		</div>
	);
}

export default Profile;
