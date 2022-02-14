import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ArticleUpdate() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const [articleData, setArticleData] = useState({ title: "", content: "" });
	const { title, content } = articleData;
	const location = useLocation();
	const articleId = location.state.articleId;
	const navigate = useNavigate();
	const user = useSelector((state) => state.userInfo.apt_house);

	useEffect(() => {
		axios({
			url: `${SERVER_URL}/api/apts/${user.apt.apt_id}/boards/articles/${articleId}`,
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
				url: `${SERVER_URL}/api/apts/${user.apt.apt_id}/boards/articles/${articleId}`,
				method: "put",
				data: articleData,
			}).then(() => {
				setArticleData({ title: "", content: "" });
				navigate(-1);
			});
		} else {
			alert("제목과 내용 모두 입력하세요!");
		}
	};

	const handleCancelButtonClick = () => {
		navigate(-1);
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
				<button>수정</button>
			</form>
		</div>
	);
}

export default ArticleUpdate;
