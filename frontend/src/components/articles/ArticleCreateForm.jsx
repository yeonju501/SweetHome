import { useState } from "react";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ArticleCreateForm({ invertDisabled, boardId }) {
	const [articleData, setArticleData] = useState({ title: "", content: "" });
	const { title, content } = articleData;

	const handleFormSubmit = (e) => {
		e.preventDefault();
		if (title.trim() && content.trim()) {
			axios({
				url: `${SERVER_URL}/api/boards/${boardId}/articles/`,
				method: "post",
				data: articleData,
			}).then(() => {
				setArticleData({ title: "", content: "" });
				invertDisabled();
			});
		} else {
			alert("제목과 내용 모두 입력하세요!");
		}
	};

	const handleInputChange = (e) => {
		setArticleData({ ...articleData, [e.target.id]: e.target.value });
	};

	return (
		<div>
			<form onSubmit={handleFormSubmit}>
				<input
					type="text"
					id="title"
					value={title}
					onChange={handleInputChange}
					placeholder="제목을 입력하세요"
				/>
				<hr />
				<input
					type="text"
					id="content"
					value={content}
					onChange={handleInputChange}
					placeholder="내용을 입력하세요"
				/>
				<hr />
				<input type="file" />
				<button type="button" onClick={invertDisabled}>
					취소
				</button>
				<button type="submit">작성</button>
			</form>
		</div>
	);
}

export default ArticleCreateForm;
