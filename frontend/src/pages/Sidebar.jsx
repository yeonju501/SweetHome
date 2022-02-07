import React from "react";
import { useSelector } from "react-redux";
import SidebarBoards from "../components/Sidebar/SidebarBoards";
import SidebarMessage from "../components/Sidebar/SideBarMessages";

function Sidebar() {
	const toggle = useSelector((state) => state.toggle.toggleValue);
	const position = useSelector((state) => state.toggle.position);

	function checkPosition(position) {
		if (position === "main") return <SidebarBoards />;
		else if (position === "message") return <SidebarMessage />;
	}

	return <>{toggle && checkPosition(position)}</>;
}

export default Sidebar;
