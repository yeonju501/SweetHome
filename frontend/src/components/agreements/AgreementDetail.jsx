import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AgreementDetail() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const location = useLocation();
	const navigate = useNavigate();
	const user = useSelector((state) => state.userInfo);
	const agreementId = location.state.id;
	const progress = location.state.progress;
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

	const isInProgress = () => {
		if (progress === "진행중") {
			return "진행중";
		} else if (progress === "만료") {
			return "만료된 동의서입니다";
		} else {
			return "진행 대기 중인 동의서입니다";
		}
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
						<p>몇 동 몇 호 {user.username}</p>
						{today && (
							<p>
								{today.getFullYear()}년 {today.getMonth() + 1}월 {today.getDate()}일
							</p>
						)}
						{isInProgress() === "진행중" ? (
							agreement.my_agreed === null ? (
								<form onSubmit={handleFormSubmit}>
									<div>
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
									</div>
								</form>
							) : (
								<p>이미 제출한 동의서입니다</p>
							)
						) : (
							<p>{isInProgress()}</p>
						)}
					</article>
				</div>
			)}
		</div>
	);
}

export default AgreementDetail;
