import { useState } from "react";
import { useLocation } from "react-router-dom";
import style from "../style/Profile.module.css";
import ProfileNav from "../components/profile/ProfileNav";
import ProfileUserInfo from "../components/profile/ProfileUserInfo";

function Profile() {
	const location = useLocation();
	const user = location.state.user;

	const [intro, setIntro] = useState({
		email: user.email,
		username: user.username,
	});

	return (
		<div className={style.profile}>
			<div className={style.profile_user}>
				<img src="" alt="Profile img" className={style.profile_img} />
				<div>
					<h1 className={style.title}>{intro.username}</h1>
					<p className={style.email}>{intro.email}</p>
				</div>
			</div>
			<ProfileNav />
			<ProfileUserInfo setIntro={setIntro} intro={intro} />
		</div>
	);
}

export default Profile;
