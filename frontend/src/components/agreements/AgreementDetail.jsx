function AgreementDetail() {
	return (
		<div>
			<div>
				<h2>동의서 제목</h2>
			</div>
			<article>
				<p>동의서 내용</p>
				<p>몇 동 몇 호 이름</p>
				<p>오늘 날짜</p>
				<input type="radio" id="agree" name="status" checked />
				<label htmlFor="agree">동의</label>
				<input type="radio" id="disagree" name="status" />
				<label htmlFor="disagree">반대</label>
			</article>
		</div>
	);
}

export default AgreementDetail;
