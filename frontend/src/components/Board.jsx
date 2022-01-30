function Board({ currentBoard }) {
	return (
		<div>
			<div>
				<p>{currentBoard.name}</p>
				<p>{currentBoard.description}</p>
			</div>
			<div>게시글 목록</div>
		</div>
	);
}

export default Board;
