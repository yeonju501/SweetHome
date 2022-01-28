import React from "react";
import style from "../style/Footer.module.css";

function Footer() {
	const array = ["회사소개", "이용약관", "개인정보처리방침", "채용정보", "문의하기"];

	return (
		<footer>
			<ul>
				{array.map((item, idx) => (
					<li key={idx}>{item}</li>
				))}
			</ul>
			<p>© 2022 SweetHome from 2030</p>
		</footer>
	);
}

export default Footer;
