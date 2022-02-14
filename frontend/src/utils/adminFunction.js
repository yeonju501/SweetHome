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

// const pageUp = () => {
//   if (page + 1 >= pageSize) {
//     alert("마지막 페이지 입니다");
//   } else {
//     setPage(page + 1);
//   }
// };

// const pageDown = () => {
//   if (page === 0) {
//     alert("처음 페이지 입니다");
//   } else {
//     setPage(page - 1);
//   }
// };
