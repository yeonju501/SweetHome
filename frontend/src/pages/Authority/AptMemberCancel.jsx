import style from "style/Authority.module.css";

function AptMemberCancel({ cancelOrRefer }) {
	const cancelRequest = (e) => {
		e.preventDefault();
		cancelOrRefer("delete", true, false);
	};
	return (
		<form onSubmit={cancelRequest}>
			<h1>
				관리자가 <br /> 인증 신청을 확인중에 있습니다
			</h1>
			<button className={style.btn_cancel_request}>인증 신청 취소하기</button>
		</form>
	);
}

export default AptMemberCancel;
