import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import { checkSidebar, checkUseNav } from "utils/authority";
import Banner from "components/Banner";
import style from "style/App.module.css";
import Admin from "pages/Admin";

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
				{authority && authority !== "준회원" && <Banner />}
			</div>
		</>
	);
}

export default Layout;
