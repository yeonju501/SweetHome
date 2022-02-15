import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as yellowStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

function SidebarStarIcon() {
	const [status, setStatus] = useState(false);

	const changeColor = () => {
		setStatus(!status);
	};

	return status ? (
		<FontAwesomeIcon
			onClick={changeColor}
			icon={yellowStar}
			style={{ color: "#ffcb14" }}
		></FontAwesomeIcon>
	) : (
		<FontAwesomeIcon onClick={changeColor} icon={emptyStar}></FontAwesomeIcon>
	);
}

export default SidebarStarIcon;
