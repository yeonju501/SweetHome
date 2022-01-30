function BoardList({ boards, setCurrentBoard }) {
	const handleBoardClick = (board) => {
		setCurrentBoard(board);
	};

	return (
		<ul>
			{boards.map((board) => (
				<li
					id={board.id}
					key={board.id}
					onClick={() => {
						handleBoardClick(board);
					}}
				>
					{board.name}
				</li>
			))}
		</ul>
	);
}

export default BoardList;
