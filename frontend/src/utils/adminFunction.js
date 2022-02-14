export function adminPagination(pageSize, setPage) {
	let tempSize = [];
	for (let i = 0; i < pageSize; i++) {
		tempSize.push(
			<button
				onClick={(e) => {
					setPage(i);
				}}
			>
				{i + 1}
			</button>,
		);
	}
	return tempSize;
}
