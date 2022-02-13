import { useState } from "react";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ArticleCreateForm({ invertDisabled, boardId, getArticlesAfterCreate }) {
	const [articleData, setArticleData] = useState({ title: "", content: "" });
	const { title, content } = articleData;
	const [imgFile, setImgFile] = useState(null);

	const handleFormSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append(
			"article",
			new Blob([JSON.stringify(articleData)], { type: "application/json" }),
		);

		imgFile
			? formData.append("image", imgFile)
			: formData.append("image", new Blob([]), { type: "multipart/form-data" });

		if (title.trim() && content.trim()) {
			axios({
				url: `${SERVER_URL}/api/boards/${boardId}/articles`,
				method: "post",
				data: formData,
			})
				.then(() => {
					setArticleData({ title: "", content: "" });
					setImgFile({});
					invertDisabled();
					getArticlesAfterCreate();
				})
				.catch((err) => console.log(err.response));
		} else {
			alert("제목과 내용 모두 입력하세요!");
		}
	};

	const handleInputChange = (e) => {
		setArticleData({ ...articleData, [e.target.id]: e.target.value });
	};

	const handleImageChange = (e) => {
		e.preventDefault();
		if (e.target.files) {
			const uploadFile = e.target.files[0];
			setImgFile(uploadFile);
		}
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
				<textarea
					type="text"
					id="content"
					value={content}
					onChange={handleInputChange}
					placeholder="내용을 입력하세요"
				/>
				<hr />
				<input type="file" accept="image/*" onChange={handleImageChange} />
				<button onClick={invertDisabled}>취소</button>
				<button type="submit">작성</button>
			</form>
		</div>
	);
}

export default ArticleCreateForm;
