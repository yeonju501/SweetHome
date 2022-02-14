import { useEffect, useState } from "react";
import style from "style/Profile.module.css";
import ProfileNav from "components/profile/ProfileNav";
import ProfileUserInfo from "components/profile/ProfileUserInfo";
import ProfileArticles from "components/profile/ProfileArticles";
import ProfileComments from "components/profile/ProfileComments";
import ProfileLikes from "components/profile/ProfileLikes";
import AptMemberRequest from "./Authority/AptMemberRequest";
import { useDispatch } from "react-redux";
import { SET_USER } from "store/user";
import { useSelector } from "react-redux";
import { GETUSERINFO } from "utils/profileAxios";

function Profile() {
	const user = useSelector((state) => state.userInfo);
	const [active, setActive] = useState(0);
	const [intro, setIntro] = useState({
		email: user.email,
		username: user.username,
	});

	const dispatch = useDispatch();
	useEffect(() => {
		GETUSERINFO(dispatch, SET_USER);
	}, []);

	return (
		<div className={style.profile}>
			<ProfileNav active={active} setActive={setActive} />
			{active !== 0 && (
				<div className={style.profile_user}>
					<figure className={style.figure}>
						<img src={user.image_url} alt="Profile img" className={style.profile_img} />
					</figure>
					<div>
						<h1 className={style.title}>{intro.username}</h1>
						<p className={style.email}>{intro.email}</p>
					</div>
				</div>
			)}
			{active === 0 && <ProfileUserInfo setIntro={setIntro} intro={intro} />}
			{active === 1 && <ProfileArticles />}
			{active === 2 && <ProfileComments />}
			{active === 3 && <ProfileLikes />}
			{active === 4 && <AptMemberRequest moving="이사가기" />}
		</div>
	);
}

export default Profile;
