import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSignOutAlt,
	faUser,
	faEnvelope,
	faBars,
	faHammer,
	faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import { SET_TOGGLE } from "store/toggle";
import style from "style/Navbar.module.css";
import { persistor } from "index";
import { useState } from "react";

import { useEffect } from "react";

function Navbar() {
	const cookies = new Cookies();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userInfo);
	const toggle = useSelector((state) => state.toggle.toggleValue);
	const position = useSelector((state) => state.toggle.position);

	const logOut = () => {
		cookies.remove("accessToken");
		cookies.remove("refreshToken");
		persistor.purge();
		window.location.replace("/");
	};

	const toggleMenu = () => {
		dispatch(SET_TOGGLE(toggle, position));
	};

	useEffect(() => {}, []);

	return (
		<div className={style.navbar_main}>
			{user && (
				<div className={style.navbar_container}>
					<div className={style.toggle_container}>
						<FontAwesomeIcon className={style.icon} onClick={toggleMenu} icon={faBars} />
						<Link className={style.main_home} to="/main">
							SweetHome
						</Link>
					</div>
					<div className={style.icon_container}>
						{user.authority === "아파트관리자" || user.authority === "어드민" ? (
							<>
								<Link to="/admin">
									<FontAwesomeIcon className={style.icon} icon={faHammer} />
								</Link>
							</>
						) : null}
						{user.authority !== "준회원" ? (
							<>
								<Link to="/message-box/">
									<FontAwesomeIcon className={style.icon} icon={faEnvelope} />
								</Link>
								<Link to={`/profile/${user.username}`} state={{ user }}>
									<FontAwesomeIcon className={style.icon} icon={faUser} />
								</Link>
							</>
						) : null}
						<FontAwesomeIcon
							id={style.logout}
							className={style.icon}
							icon={faSignOutAlt}
							onClick={logOut}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default Navbar;
