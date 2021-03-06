import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "style/articles/ArticleCreate.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

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
		} else {
			alert("제목과 내용 모두 입력해주세요!");
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
		<div className={style.update_body}>
			<form onSubmit={handleFormSubmit}>
				<input
					type="text"
					id="title"
					className={style.input_text}
					value={title}
					onChange={handleInputChange}
				/>
				<input
					type="text"
					id="content"
					className={style.textarea}
					value={content}
					onChange={handleInputChange}
				/>
				<div className={style.button_box}>
					<div>
						<label htmlFor="file" className={style.file_label}>
							<FontAwesomeIcon icon={faCamera} color="#afafaf" size="lg" />
						</label>
						<input
							type="file"
							id="file"
							className={style.input_file}
							accept="image/*"
							onChange={handleImageChange}
						/>
					</div>
					<div className={style.updateBtns}>
						<button onClick={handleCancelButtonClick} className={style.outline_btn}>
							취소
						</button>
						<button>수정</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default ArticleUpdate;
