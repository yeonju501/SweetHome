import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as yellowStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

function SidebarStarIcon({ status }) {
	return status ? (
		<FontAwesomeIcon
			icon={yellowStar}
			style={{ color: "#ffcb14", cursor: "pointer" }}
		></FontAwesomeIcon>
	) : (
		<FontAwesomeIcon style={{ cursor: "pointer" }} icon={emptyStar}></FontAwesomeIcon>
	);
}

export default SidebarStarIcon;
