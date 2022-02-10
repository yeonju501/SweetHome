import axios from "axios";
import { useEffect, useState } from "react";

function ReportType() {
	const URL = process.env.REACT_APP_SERVER_URL;
	const [reportTypes, setReportTypes] = useState([]);
	const [types, setType] = useState({ type: "", content: "" });

	const { type } = types;
	useEffect(() => {
		axios.get(`${URL}/api/boards/reporttypes`).then((res) => setReportTypes(res.data));
	});

	const onChange = (e) => {
		setType({
			...types,
			[e.target.id]: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		setType({ type: "", content: "" });
		console.log(types);
	};
	return (
		types && (
			<div>
				<header>
					<h1>신고하기</h1>
					<p>
						내용: <span>글 혹은 댓글 내용</span>
					</p>
					<p>
						작성자: <span>작성자 아이디</span>
					</p>
				</header>
				<main>
					<p>
						사유선택 : <span>대표적인 사유 1개를 선택해주세요</span>
					</p>
					<form onSubmit={onSubmit}>
						{reportTypes.map((type, idx) => (
							<div key={idx}>
								<input
									name="report"
									id="type"
									type="radio"
									onChange={onChange}
									value={type.content}
								/>
								<label htmlFor="">{type.content}</label>
							</div>
						))}
						{types.type === "기타" && (
							<textarea
								id="content"
								onChange={onChange}
								placeholder="신고사유를 상세히 적어주세요"
							></textarea>
						)}
						<button>신고하기</button>
						<button>취소</button>
					</form>
				</main>
			</div>
		)
	);
}

export default ReportType;
