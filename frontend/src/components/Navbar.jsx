import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSignOutAlt,
	faUser,
	faEnvelope,
	faBars,
	faHome,
	faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import { SET_TOGGLE } from "store/toggle";
import style from "style/Navbar.module.css";
import { persistor } from "index";
import { useState } from "react";
import CreateBoard from "./boards/BoardCreate";

function Navbar() {
	const cookies = new Cookies();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userInfo);
	const toggle = useSelector((state) => state.toggle.toggleValue);
	const position = useSelector((state) => state.toggle.position);
	const [modalOpen, setModalOpen] = useState(false);

	const logOut = () => {
		cookies.remove("accessToken");
		cookies.remove("refreshToken");
		persistor.purge();
		window.location.replace("/");
	};

	const toggleMenu = () => {
		dispatch(SET_TOGGLE(toggle, position));
	};

	const handleModal = () => {
		setModalOpen(false);
	};

	return (
		<nav className={style.navbar_main}>
			{user && (
				<div className={style.navbar_container}>
					<div className={style.toggle_container}>
						<FontAwesomeIcon className={style.icon} onClick={toggleMenu} icon={faBars} />
						<Link className={style.main_home} to="/main">
							SweetHome
							{/* <FontAwesomeIcon className={style.icon} icon={faHome} /> */}
						</Link>
					</div>
					<div className={style.icon_container}>
						<FontAwesomeIcon
							onClick={() => setModalOpen(true)}
							className={style.icon}
							icon={faPlus}
						/>
						{modalOpen && <CreateBoard isOpen={modalOpen} onCancel={handleModal} />}

						<Link to="/message-box/">
							<FontAwesomeIcon className={style.icon} icon={faEnvelope} />
						</Link>
						<Link to={`/profile/${user.username}`} state={{ user }}>
							<FontAwesomeIcon className={style.icon} icon={faUser} />
						</Link>
						<FontAwesomeIcon className={style.icon} icon={faSignOutAlt} onClick={logOut} />
					</div>
				</div>
			)}
		</nav>
	);
}

export default Navbar;
