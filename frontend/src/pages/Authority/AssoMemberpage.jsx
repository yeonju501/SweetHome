import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "style/Authority.module.css";
import { ReactComponent as PersonalInfo } from "assets/personal_info.svg";
import axios from "axios";

function AssoMemberpage({}) {
	const URL = process.env.REACT_APP_SERVER_URL;
	const [isRequest, setIsRequest] = useState(true);
	useEffect(() => {
		axios({
			url: `${URL}/api/apts/register`,
			method: "get",
			headers: { "Content-type": "application/json;charset=UTF-8" },
		})
			.then(() => setIsRequest(false))
			.catch(() => setIsRequest(true));
	}, []);
	return (
		<>
			<div className={style.asso_div}>
				<h1>SweetHome을 찾아주셔서 감사합니다</h1>
				{isRequest ? (
					<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
						<p>
							SweetHome은 원활한 서비스 이용을 위해 거주하고 계신 아파트 인증을 필수적으로 진행하고
							있습니다. <br /> 아래 링크를 통해 꼭 인증을 해주시기 바랍니다
						</p>
						<div className={style.Links}>
							<Link to="/request/apt-member">아파트 세대원 인증하러 가기</Link>
							<Link to="/request/apt-admin">아파트 관리자 인증하러 가기</Link>
						</div>
					</div>
				) : (
					<div>
						<p>관리자가 인증 확인중에 있습니다</p>
						<form>
							<button>인증 신청 취소하기</button>
						</form>
					</div>
				)}

				<PersonalInfo />
			</div>
		</>
	);
}

export default AssoMemberpage;
