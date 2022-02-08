import { useState } from "react";
import { useLocation } from "react-router-dom";
import style from "../style/Profile.module.css";
import ProfileNav from "../components/profile/ProfileNav";
import ProfileUserInfo from "../components/profile/ProfileUserInfo";
import ProfileArticles from "../components/profile/ProfileArticles";
import ProfileComments from "../components/profile/ProfileComments";
import ProfileLikes from "../components/profile/ProfileLikes";
import ProfileAptEnroll from "../components/profile/ProfileAptEnroll";

function Profile() {
	const location = useLocation();
	const [active, setActive] = useState(0);
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
			<ProfileNav active={active} setActive={setActive} />
			{active === 0 && <ProfileUserInfo setIntro={setIntro} intro={intro} />}
			{active === 1 && <ProfileArticles />}
			{active === 2 && <ProfileComments />}
			{active === 3 && <ProfileLikes />}
			{active === 4 && <ProfileAptEnroll />}
		</div>
	);
}

export default Profile;
