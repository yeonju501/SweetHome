import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import { checkSidebar, checkUseNav } from "utils/authority";
import style from "style/App.module.css";

function Layout() {
	const authority = useSelector((state) => state.userInfo.authority);

	return (
		<>
			{checkUseNav(authority)}
			<div className={authority ? style.div : style.public}>
				{checkSidebar(authority)}
				<main className={authority ? style.main : style.public}>
					<Outlet />
				</main>
			</div>
		</>
	);
}

export default Layout;
