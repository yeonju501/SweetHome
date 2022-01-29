import { useState } from "react";
import axios from "axios";

function CreateArticleActivated({ setDisabled }) {
	const token = window.localStorage.getItem("access_token");

	const [articleData, setArticleData] = useState({ title: "", content: "" });
	const { title, content } = articleData;

	const handleCancelButtonClick = () => {
		setDisabled(true);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		if (title.trim() && content.trim()) {
			axios({
				url: "http://localhost:8080/api/boards/articles/",
				headers: { Authorization: `Bearer ${token}` },
				method: "post",
				data: articleData,
			})
				.then((res) => {
					console.log(res);
					setArticleData({ title: "", content: "" });
					setDisabled(true);
				})
				.catch((err) => {
					console.log(err);
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
				<button onClick={handleCancelButtonClick}>취소</button>
				<button onClick={handleFormSubmit}>작성</button>
			</form>
		</div>
	);
}

export default CreateArticleActivated;
