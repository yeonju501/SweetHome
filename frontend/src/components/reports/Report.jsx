import ReportType from "./ReportType";
import { useSelector } from "react-redux";

function Report() {
	const target = useSelector((state) => state.reportInfo);
	return (
		<>
			{target && (
				<>
					<header>
						<h1>신고하기</h1>
						<p>
							내용: <span>{target.content}</span>
						</p>
						<p>
							작성자: <span>{target.username}</span>
						</p>
					</header>
					<ReportType id={target.id} />
				</>
			)}
		</>
	);
}

export default Report;
