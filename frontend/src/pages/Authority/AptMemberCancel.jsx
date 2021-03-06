import style from "style/Authority.module.css";
import { cancelOrRefer, hasRequestAptAdmin } from "utils/authorityRequest";

function AptMemberCancel({ setIsRequest }) {
	const cancelRequest = () => {
		cancelOrRefer("delete", setIsRequest);
		hasRequestAptAdmin("delete", setIsRequest);
	};

	return (
		<form>
			<h1>
				관리자가 <br /> 인증 신청을 확인중에 있습니다
			</h1>
			<button onClick={cancelRequest} className={style.btn_cancel_request}>
				인증 신청 취소하기
			</button>
		</form>
	);
}

export default AptMemberCancel;
