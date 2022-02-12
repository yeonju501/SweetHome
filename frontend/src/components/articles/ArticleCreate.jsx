import { useEffect, useState } from "react";
import ArticleCreateForm from "./ArticleCreateForm";

function ArticleCreate({ boardId, getArticles, setPageNumber, setArticles }) {
	const [formOpen, setFormOpen] = useState(false);

	useEffect(() => {
		setFormOpen(false);
	}, [boardId]);

	const invertDisabled = () => {
		setFormOpen((prev) => !prev);
	};

	const getArticlesAfterCreate = () => {
		window.location.replace(`/boards/${boardId}`);
	};

	return (
		<div>
			{formOpen ? (
				<ArticleCreateForm
					invertDisabled={invertDisabled}
					boardId={boardId}
					getArticlesAfterCreate={getArticlesAfterCreate}
				/>
			) : (
				<div onClick={invertDisabled}>
					<p>글을 작성해보세요!</p>
				</div>
			)}
		</div>
	);
}

export default ArticleCreate;
