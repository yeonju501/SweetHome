function BoardList({ boards }) {
	return (
		<ul>
			{boards.map((board) => (
				<li id={board.id} key={board.id}>
					{board.name}
				</li>
			))}
		</ul>
	);
}

export default BoardList;
