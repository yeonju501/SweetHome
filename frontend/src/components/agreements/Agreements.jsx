import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Agreements() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const [agreements, setAgreements] = useState("");
	const today = new Date();

	const agreementProgress = (start_date, end_date) => {
		if (new Date(start_date) > today) {
			return "진행 예정";
		} else if (today > new Date(end_date)) {
			return "만료";
		} else {
			return "진행중";
		}
	};

	useEffect(() => {
		axios({
			url: `${SERVER_URL}/api/agreements`,
			method: "get",
		}).then((res) => {
			setAgreements(res.data.agreements);
		});
	}, []);

	return (
		<div>
			<h1>관리 동의서 게시판</h1>
			<table>
				<thead>
					<tr>
						<th>제목</th>
						<th>기간</th>
						<th>진행여부</th>
					</tr>
				</thead>

				<tbody>
					{agreements ? (
						agreements.map((agreement, idx) => (
							<tr key={idx}>
								<td>
									<Link
										to={`/agreement/${agreement.agreement_id}`}
										state={{ id: agreement.agreement_id }}
									>
										{agreement.title}{" "}
									</Link>
								</td>
								<td>
									{agreement.start_date.slice(0, 10)} ~ {agreement.end_date.slice(0, 10)}
								</td>
								<td>{agreementProgress(agreement.start_date, agreement.end_date)}</td>
							</tr>
						))
					) : (
						<tr>
							<td>작성된 동의서가 없습니다</td>
						</tr>
					)}
				</tbody>
			</table>
			<Link to={"/agreement/create"}>작성</Link>
			<footer>페이지네이션</footer>
		</div>
	);
}

export default Agreements;
