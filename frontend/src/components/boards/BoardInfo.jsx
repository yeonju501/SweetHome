function BoardInfo({ board }) {
	return (
		<div className="">
			<p>게시판명 : {board.name}</p>
			<p>게시판 소개글 : {board.Description}</p>
		</div>
	);
}

export default BoardInfo;
