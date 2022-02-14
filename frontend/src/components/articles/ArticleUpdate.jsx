import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ArticleUpdate() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const location = useLocation();
	const articleId = location.state.articleId;
	const navigate = useNavigate();
	const user = useSelector((state) => state.userInfo.apt_house);

	const [articleData, setArticleData] = useState({ title: "", content: "" });
	const [imgFile, setImgFile] = useState("");
	const { title, content } = articleData;

	useEffect(() => {
		axios({
			url: `${SERVER_URL}/api/apts/${user.apt.apt_id}/boards/articles/${articleId}`,
			method: "get",
		}).then((res) => {
			setArticleData({ title: res.data.title, content: res.data.content });
		});
	}, []);

	const handleInputChange = (e) => {
		setArticleData({ ...articleData, [e.target.id]: e.target.value });
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append(
			"article",
			new Blob([JSON.stringify(articleData)], { type: "application/json" }),
		);
		console.log(imgFile);
		imgFile
			? formData.append("image", imgFile)
			: formData.append("image", new Blob([]), { type: "multipart/form-data" });

		if (title.trim() && content.trim()) {
			axios({
				url: `${SERVER_URL}/api/apts/${user.apt.apt_id}/boards/articles/${articleId}`,
				method: "put",
				data: formData,
			})
				.then(() => {
					setArticleData({ title: "", content: "" });
					setImgFile("");
					navigate(-1);
				})
				.catch((err) => console.log(err.response));
		}
	};

	const handleCancelButtonClick = () => {
		navigate(-1);
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
				<input type="text" id="title" value={title} onChange={handleInputChange} />
				<hr />
				<input type="text" id="content" value={content} onChange={handleInputChange} />
				<hr />
				<input type="file" accept="image/*" onChange={handleImageChange} />
				<button onClick={handleCancelButtonClick}>취소</button>
				<button>수정</button>
			</form>
		</div>
	);
}

export default ArticleUpdate;
