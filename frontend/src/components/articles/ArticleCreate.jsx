import { useState } from "react";
import ArticleCreateForm from "./ArticleCreateForm";

function ArticleCreate({ boardId, getArticles }) {
	const [disabled, setDisabled] = useState(true);

	const invertDisabled = () => {
		setDisabled((prev) => !prev);
		getArticles();
	};

	return (
		<div>
			{disabled ? (
				<div onClick={invertDisabled}>
					<p>글을 작성해보세요!</p>
				</div>
			) : (
				<ArticleCreateForm invertDisabled={invertDisabled} boardId={boardId} />
			)}
		</div>
	);
}

export default ArticleCreate;
