import ReportType from "./ReportType";
import { useSelector } from "react-redux";
import style from "style/Report.module.css";

function Report() {
	const target = useSelector((state) => state.reportInfo);
	return (
		<>
			{target && (
				<div className={style.report_header}>
					<header>
						<h1>신고하기</h1>
						<p>
							<span>내용 : </span>
							{target.content}
						</p>
						<p>
							<span>작성자 : </span>
							{target.username}
						</p>
						<hr />
					</header>
					<ReportType id={target.id} />
				</div>
			)}
		</>
	);
}

export default Report;
