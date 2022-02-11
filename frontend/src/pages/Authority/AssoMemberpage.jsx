import { Link } from "react-router-dom";
import style from "style/Authority.module.css";
import { ReactComponent as PersonalInfo } from "assets/personal_info.svg";
function AssoMemberpage() {
	return (
		<>
			<div className={style.asso_div}>
				<h1>SweetHome을 찾아주셔서 감사합니다</h1>
				<p>
					SweetHome은 원활한 서비스 이용을 위해 거주하고 계신 아파트 인증을 필수적으로 진행하고
					있습니다. <br /> 아래 링크를 통해 꼭 신청을 해주시기 바랍니다
				</p>
				<div className={style.Links}>
					<Link to="/request/apt-member">아파트 세대원 신청하러 가기</Link>
					<Link to="/request/apt-admin">아파트 관리자 신청하러 가기</Link>
				</div>
				<PersonalInfo />
			</div>
		</>
	);
}

export default AssoMemberpage;
