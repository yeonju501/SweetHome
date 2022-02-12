import React from "react";
import { useSelector } from "react-redux";
import SidebarAdmin from "components/Sidebar/SidebarAdmin";
import SidebarBoards from "components/Sidebar/SidebarBoards";
import SidebarMessage from "components/Sidebar/SideBarMessages";

function Sidebar() {
	const toggle = useSelector((state) => state.toggle.toggleValue);
	const position = useSelector((state) => state.toggle.position);

	function checkPosition(position) {
		if (position === "admin") return <SidebarAdmin />;
		if (position === "message") return <SidebarMessage />;
		return <SidebarBoards />;
	}

	return <>{toggle && checkPosition(position)}</>;
}

export default Sidebar;
