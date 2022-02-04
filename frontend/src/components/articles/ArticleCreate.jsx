import { useState } from "react";
import ArticleCreateForm from "./ArticleCreateForm";
import CreateArticleDisabled from "./CreateArticleDisabled";

function ArticleCreate({ boardId, getArticles }) {
	const [disabled, setDisabled] = useState(true);
	return (
		<div>
			{disabled ? (
				<CreateArticleDisabled setDisabled={setDisabled} />
			) : (
				<ArticleCreateForm setDisabled={setDisabled} boardId={boardId} getArticles={getArticles} />
			)}
		</div>
	);
}

export default ArticleCreate;
