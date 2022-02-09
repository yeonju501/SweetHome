import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function AgreementDetail() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const location = useLocation();
	const [agreement, setAgreement] = useState("");
	const agreementId = 1;

	useEffect(() => {
		axios({
			url: `${SERVER_URL}/api/agreements/${agreementId}`,
			method: "get",
		}).then((res) => {
			setAgreement(res.data);
		});
	}, []);

	return (
		<div>
			<div>
				<h2>동의서 제목</h2>
			</div>
			<article>
				<p>동의서 내용</p>
				<p>몇 동 몇 호 이름</p>
				<p>오늘 날짜</p>
				<form>
					<input type="radio" id="agree" name="status" />
					<label htmlFor="agree">동의</label>
					<input type="radio" id="disagree" name="status" />
					<label htmlFor="disagree">반대</label>
					<button>제출</button>
				</form>
			</article>
		</div>
	);
}

export default AgreementDetail;
