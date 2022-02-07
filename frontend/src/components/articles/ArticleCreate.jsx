import { useEffect, useState } from "react";
import ArticleCreateForm from "./ArticleCreateForm";

function ArticleCreate({ boardId, getArticles, setPageNumber, setArticles }) {
	const [disabled, setDisabled] = useState(true);

	useEffect(() => {
		setDisabled(true);
	}, [boardId]);

	const invertDisabled = () => {
		setDisabled((prev) => !prev);
	};

	const test = () => {
		setPageNumber(0);
		setArticles("");
		getArticles();
	};

	return (
		<div>
			{disabled ? (
				<div onClick={invertDisabled}>
					<p>글을 작성해보세요!</p>
				</div>
			) : (
				<ArticleCreateForm invertDisabled={invertDisabled} boardId={boardId} test={test} />
			)}
		</div>
	);
}

export default ArticleCreate;
