import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function AgreementDetail() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const location = useLocation();
	const navigate = useNavigate();
	const agreementId = location.state.id;
	const [agreement, setAgreement] = useState("");
	const [agreementStatus, setAgreementStatus] = useState("");
	const today = new Date();

	useEffect(() => {
		axios({
			url: `${SERVER_URL}/api/agreements/${agreementId}`,
			method: "get",
		}).then((res) => {
			setAgreement(res.data);
		});
	}, []);

	const handleFormSubmit = (e) => {
		e.preventDefault();
		axios({
			url: `${SERVER_URL}/api/agreements/${agreementId}`,
			method: "post",
			data: { agreement_status: agreementStatus },
		})
			.then((res) => {
				console.log(res);
				setAgreementStatus("");
				navigate("/agreements");
			})
			.catch((err) => console.log(err.response));
	};

	const handleInputChange = (e) => {
		e.target.value === "agree" ? setAgreementStatus(true) : setAgreementStatus(false);
	};

	return (
		<div>
			{agreement && (
				<div>
					<div>
						<h2>{agreement.title}</h2>
					</div>
					<article>
						<p>{agreement.content}</p>
						<p>몇 동 몇 호 이름</p>
						{today && (
							<p>
								{today.getFullYear()}년 {today.getMonth() + 1}월 {today.getDate()}일
							</p>
						)}
						<form onSubmit={handleFormSubmit}>
							<input
								type="radio"
								id="agree"
								name="status"
								value="agree"
								onChange={handleInputChange}
							/>
							<label htmlFor="agree">동의</label>
							<input
								type="radio"
								id="disagree"
								name="status"
								value="disagree"
								onChange={handleInputChange}
							/>
							<label htmlFor="disagree">반대</label>
							<button>제출</button>
						</form>
					</article>
				</div>
			)}
		</div>
	);
}

export default AgreementDetail;
