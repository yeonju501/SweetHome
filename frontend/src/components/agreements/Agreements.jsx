import { Link } from "react-router-dom";

function Agreements() {
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
					<tr>
						<td></td>
						<td></td>
						<td></td>
					</tr>
				</tbody>
			</table>
			<Link to={"/agreement/create"}>작성</Link>
			<footer>페이지네이션</footer>
		</div>
	);
}

export default Agreements;
