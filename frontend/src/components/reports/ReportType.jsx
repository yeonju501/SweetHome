import axios from "axios";
import { useEffect, useState } from "react";

function ReportType({ id }) {
	const URL = process.env.REACT_APP_SERVER_URL;
	const [reportTypes, setReportTypes] = useState([]);
	const [types, setType] = useState({ type: "", content: "" });

	useEffect(() => {
		axios.get(`${URL}/api/boards/reporttypes`).then((res) => setReportTypes(res.data));
	});

	const onChange = (e) => {
		setType({
			...types,
			[e.target.id]: e.target.value,
		});
	};

	const { type, content } = types;

	const onSubmit = (e) => {
		e.preventDefault();
		if (!type) return alert("신고 사유를 선택해주세요");

		if (type === "기타" && !content) return alert("신고 사유를 작성해주세요");

		axios({
			url: `${URL}/api/comments/${id}/reports`,
			method: "post",
			data: types,
		})
			.then((res) => {
				setType({ type: "", content: "" });
				console.log(res);
			})
			.catch((err) => console.log(err));

		console.log(types);
	};
	return (
		types && (
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
		)
	);
}

export default ReportType;
