import style from "../style/Pagination.module.css";

export function adminPagination(pageSize, setPage) {
	let tempSize = [];
	for (let i = 0; i < pageSize; i++) {
		tempSize.push(
			<button
				className={style.btn_pagination}
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

export const pageUp = (page, pageSize, setPage) => {
	if (page + 1 >= pageSize) {
		alert("마지막 페이지 입니다");
	} else {
		setPage(page + 1);
	}
};

export const pageDown = (page, pageSize, setPage) => {
	if (page === 0) {
		alert("처음 페이지 입니다");
	} else {
		setPage(page - 1);
	}
};
