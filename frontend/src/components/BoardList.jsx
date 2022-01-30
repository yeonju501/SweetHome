function BoardList({ boards }) {
	return (
		<ul>
			{boards.map((board) => (
				<li key={board.id}>{board.name}</li>
			))}
		</ul>
	);
}

export default BoardList;
