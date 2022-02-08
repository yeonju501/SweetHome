function AgreementCreate() {
	return (
		<div>
			<h1>동의서 작성</h1>
			<form>
				<input type="text" placeholder="제목을 입력하세요"></input>
				<input type="date"></input>
				<textarea placeholder="동의서 내용을 입력하세요"></textarea>
				<button>작성</button>
				<button>취소</button>
			</form>
		</div>
	);
}

export default AgreementCreate;
