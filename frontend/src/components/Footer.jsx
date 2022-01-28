import React from "react";

function Footer() {
	const array = ["회사소개", "이용약관", "개인정보 처리방침", "채용정보", "문의하기"];

	return (
		<div>
			<ul style={{ display: "flex" }}>
				{array.map((item, idx) => (
					<li key={idx} style={{ listStyle: "none" }}>
						{item}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Footer;
