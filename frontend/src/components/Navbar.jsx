import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DELETE_TOKEN } from "../store/token";
import { SET_TOGGLE } from "../store/toggle";

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

	return (
		<nav>
			{user && (
				<div>
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
