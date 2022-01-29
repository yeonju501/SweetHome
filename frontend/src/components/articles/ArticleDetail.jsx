function ArticleDetail() {
	return (
		<div>
			<div>게시판 제목</div>
			<article>
				<div>
					<p>닉네임</p>
					<p>작성 날짜</p>
					<p>작성 시간</p>
				</div>
				<div>
					<button>쪽지</button>
					<button>신고</button>
				</div>
				<div>
					<button>수정</button>
					<button>삭제</button>
				</div>
				<h3>글 제목</h3>
				<p>글 내용</p>
				<div>
					<span>좋아요 수</span>
					<span>댓글 수</span>
					<button>🤍</button>
				</div>
			</article>
			<div>댓글 박스</div>
		</div>
	);
}

export default ArticleDetail;
