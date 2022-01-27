import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function CreateBoard() {
	const token = useSelector((state) => state.token.token);
	const [boardInfo, setBoardInfo] = useState({ name: "", description: "" });

	const { name, description } = boardInfo;

	const handleInputChange = (e) => {
		setBoardInfo({ ...boardInfo, [e.target.id]: e.target.value });
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		if (name.trim() && description.trim()) {
			axios({
				url: "http://localhost:8080/api/boards",
				headers: { Authorization: `Bearer ${token}` },
				method: "post",
				data: boardInfo,
			})
				.then(() => {
					setBoardInfo({ name: "", description: "" });
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			alert("게시판명과 소개글을 모두 입력해주세요!");
		}
	};

	return (
		<div>
			<form>
				<h1>게시판 생성</h1>
				<input
					type="text"
					id="name"
					value={name}
					onChange={handleInputChange}
					placeholder="게시판명을 입력하세요"
				/>
				<input
					type="text"
					id="description"
					value={description}
					onChange={handleInputChange}
					placeholder="게시판 소개글을 입력하세요"
				/>
				<button onClick={handleFormSubmit}>등록</button>
				<button>취소</button>
			</form>
		</div>
	);
}

export default CreateBoard;
