import style from "style/Pagination.module.css";

function ProfilePagination({ total, page, setData }) {
	return (
		<>
			<nav className={style.pagination}>
				<button
					className={style.btn_pagination}
					onClick={() => setData((prev) => ({ ...prev, currentPage: page - 1 }))}
					disabled={page === 0}
				>
					&lt;
				</button>
				{Array(total)
					.fill()
					.map((_, i) => (
						<button
							className={style.btn_pagination}
							key={i + 1}
							onClick={() => setData((prev) => ({ ...prev, currentPage: i }))}
							aria-current={page === i ? "page" : null}
						>
							{i + 1}
						</button>
					))}
				<button
					className={style.btn_pagination}
					onClick={() => setData((prev) => ({ ...prev, currentPage: page + 1 }))}
					disabled={page === total - 1}
				>
					&gt;
				</button>
			</nav>
		</>
	);
}

export default ProfilePagination;
