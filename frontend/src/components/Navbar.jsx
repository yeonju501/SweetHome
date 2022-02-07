import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUser, faEnvelope, faBars } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DELETE_TOKEN } from "../store/token";
import { SET_TOGGLE } from "../store/toggle";
import SidebarBoards from "./SidebarBoards";
import SidebarMessage from "./SideBarMessages";

function Navbar() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userInfo.username);
	const toggle = useSelector((state) => state.toggle.toggleValue);
	const position = useSelector((state) => state.toggle.position);

	const logOut = () => {
		dispatch(DELETE_TOKEN());
	};

	const toggleMenu = () => {
		dispatch(SET_TOGGLE(toggle, position));
	};

	function checkPosition(position) {
		if (position === "main") return <SidebarBoards />;
		else if (position === "message") return <SidebarMessage />;
	}

	return (
		<nav>
			{user && (
				<div>
					<FontAwesomeIcon onClick={toggleMenu} icon={faBars} />
					{toggle && checkPosition(position)}
					<Link to="/main">SweetHome</Link>
					<Link to="/message-box/read-receive-message">
						<FontAwesomeIcon icon={faEnvelope} />
					</Link>
					<FontAwesomeIcon icon={faSignOutAlt} onClick={logOut} />
					<Link to={`/profile/${user}`}>
						<FontAwesomeIcon icon={faUser} />
					</Link>
				</div>
			)}
		</nav>
	);
}

export default Navbar;
