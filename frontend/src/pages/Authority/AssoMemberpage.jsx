import { Link } from "react-router-dom";

function AssoMemberpage() {
	return (
		<div>
			<h1>SweetHome을 찾아주셔서 감사합니다</h1>
			<p>
				저희 SweetHome의 원활한 서비스 이용을 위해 거주하고 계신 아파트의 인증이 필요하니 아래
				링크를 통해 꼭 신청을 해주시기 바랍니다
			</p>
			<Link to="/request/apt-member">아파트 세대원 신청하러 가기</Link>
			<Link to="/request/apt-admin">아파트 관리자 신청하러 가기</Link>
		</div>
	);
}

export default AssoMemberpage;
