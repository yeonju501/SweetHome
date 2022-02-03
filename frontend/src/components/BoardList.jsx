import style from "../style/BoardList.module.css";

function BoardList({ boards, setCurrentBoard }) {
	const handleBoardClick = (board) => {
		setCurrentBoard(board);
	};

	return (
		<div className={style.boardlist}>
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
		</div>
	);
}

export default BoardList;
