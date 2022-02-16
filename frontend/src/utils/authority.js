import Navbar from "components/Navbar";
import Sidebar from "pages/Sidebar";
import style from "style/App.module.css";

const authority_value = ["", "준회원", "정회원", "아파트관리자", "어드민"];

export function authorityCheck(authority) {
	return authority_value.indexOf(authority);
}

export function checkUseNav(authority) {
	const authorityGrade = authority_value.indexOf(authority);
	if (authorityGrade === 0) return null;
	if (authorityGrade >= 1) return <Navbar />;
}

export function checkSidebar(authority) {
	const authorityGrade = authority_value.indexOf(authority);
	if (authorityGrade >= 2) return <Sidebar />;
}
