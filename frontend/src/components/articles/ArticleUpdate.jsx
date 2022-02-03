import { useEffect, useState } from "react";
import axios from "axios";

function ArticleUpdate({ articleId, setUpdate }) {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const [articleData, setArticleData] = useState({ title: "", content: "" });
	const { title, content } = articleData;

	useEffect(() => {
		axios({
			url: `${SERVER_URL}/api/boards/articles/${articleId}`,
			method: "get",
		}).then((res) => {
			setArticleData(res.data);
		});
	}, []);

	const handleInputChange = (e) => {
		setArticleData({ ...articleData, [e.target.id]: e.target.value });
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		if (title.trim() && content.trim()) {
			axios({
				url: `${SERVER_URL}/api/boards/articles/${articleId}`,
				method: "put",
				data: articleData,
			}).then((res) => {
				setArticleData({ title: "", content: "" });
				setUpdate(false);
			});
		} else {
			alert("제목과 내용 모두 입력하세요!");
		}
	};

	const handleCancelButtonClick = () => {
		setUpdate(false);
	};

	return (
		<div>
			<form onSubmit={handleFormSubmit}>
				<input type="text" id="title" value={articleData.title} onChange={handleInputChange} />
				<hr />
				<input type="text" id="content" value={articleData.content} onChange={handleInputChange} />
				<hr />
				<input type="file" />
				<button onClick={handleCancelButtonClick}>취소</button>
				<button onSubmit={handleFormSubmit}>수정</button>
			</form>
		</div>
	);
}

export default ArticleUpdate;
