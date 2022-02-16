import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import { checkSidebar, checkUseNav } from "utils/authority";
import Banner from "components/Banner";
import style from "style/App.module.css";

function Layout() {
	const authority = useSelector((state) => state.userInfo.authority);
	const toggle = useSelector((state) => state.toggle.toggleValue);

	return (
		<>
			{checkUseNav(authority)}
			<div className={authority ? style.div : style.public}>
				<aside className={(style.aside, toggle ? style.show : style.unshow)}>
					{checkSidebar(authority)}
				</aside>
				<main className={authority ? style.main : style.public}>
					<Outlet />
				</main>
				{authority && authority !== "준회원" && <Banner />}
			</div>
		</>
	);
}

export default Layout;
