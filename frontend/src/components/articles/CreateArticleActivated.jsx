import { useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function CreateArticleActivated({ setDisabled, boardId }) {
	const token = useSelector((state) => state.token.token);

	const [articleData, setArticleData] = useState({ title: "", content: "" });
	const { title, content } = articleData;

	const handleCancelButtonClick = () => {
		setDisabled(true);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		if (title.trim() && content.trim()) {
			axios({
				url: `${SERVER_URL}/api/boards/${boardId}/articles/`,
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
