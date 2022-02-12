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
import CreateBoard from "./boards/BoardCreate";
import { useEffect } from "react";

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

	useEffect(() => {
		if (modalOpen) {
			document.body.style.cssText = `
		position: fixed; 
		top: -${window.scrollY}px;
		overflow-y: scroll;
		width: 100%;`;
			return () => {
				const scrollY = document.body.style.top;
				document.body.style.cssText = "";
				window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
			};
		}
	}, [modalOpen]);

	return (
		<div className={style.navbar_main}>
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
						{modalOpen && <CreateBoard isOpen={modalOpen} onCancel={handleModal} />}
						{user.authority === "아파트관리자" || user.authority === "어드민" ? (
							<>
								<FontAwesomeIcon
									onClick={() => setModalOpen(true)}
									className={style.icon}
									icon={faPlus}
								/>

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
