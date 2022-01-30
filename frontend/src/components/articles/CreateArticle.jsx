import { useState } from "react";
import CreateArticleActivated from "./CreateArticleActivated";
import CreateArticleDisabled from "./CreateArticleDisabled";

function CreateArticle({ boardId, getArticles }) {
	const [disabled, setDisabled] = useState(true);
	return (
		<div>
			{disabled ? (
				<CreateArticleDisabled setDisabled={setDisabled} />
			) : (
				<CreateArticleActivated
					setDisabled={setDisabled}
					boardId={boardId}
					getArticles={getArticles}
				/>
			)}
		</div>
	);
}

export default CreateArticle;
