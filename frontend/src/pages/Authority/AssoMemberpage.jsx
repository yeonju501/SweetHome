import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "style/Authority.module.css";
import { ReactComponent as PersonalInfo } from "assets/authentication.svg";
import { ReactComponent as Checking } from "assets/Loading.svg";
import AptMemberCancel from "./AptMemberCancel";
import { cancelOrRefer } from "utils/authorityRequest";

function AssoMemberpage() {
	const [isRequest, setIsRequest] = useState(true);

	useEffect(() => {
		cancelOrRefer("get", setIsRequest, false, true);
	}, []);

	return (
		<div className={style.asso_div}>
			{isRequest ? (
				<div style={{ display: "flex", alignItems: "center", height: "100vh" }}>
					<PersonalInfo className={style.personalInfo} />
					<main className={style.asso_main}>
						<h1>SweetHome을 찾아주셔서 감사합니다</h1>
						<p>
							SweetHome은 원활한 서비스 이용을 위해 <br />
							거주하고 계신 아파트 인증을 필수적으로 진행하고 있습니다. <br /> 아래 링크를 통해
							인증을 해주시기 바랍니다
						</p>
						<div className={style.Links}>
							<Link to="/request/apt-member">아파트 세대원 인증하러 가기</Link>
							<Link to="/request/apt-admin">아파트 관리자 인증하러 가기</Link>
						</div>
					</main>
				</div>
			) : (
				<div className={style.cancel_request}>
					<Checking className={style.asso_checking} />
					<AptMemberCancel setIsRequest={setIsRequest} />
				</div>
			)}
		</div>
	);
}

export default AssoMemberpage;
