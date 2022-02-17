import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ReactModal from "react-modal";
import style from "style/BoardCreate.module.css";

function CreateBoard(props) {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const user = useSelector((state) => state.userInfo.apt_house);
	const [boardInfo, setBoardInfo] = useState({ name: "", description: "" });
	const { isOpen, onCancel } = props;
	const { name, description } = boardInfo;

	const handleInputChange = (e) => {
		setBoardInfo({ ...boardInfo, [e.target.id]: e.target.value });
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		if (name.trim() && description.trim()) {
			axios({
				url: `${SERVER_URL}/api/apts/${user.apt.apt_id}/boards`,
				method: "post",
				data: boardInfo,
			})
				.then(() => {
					setBoardInfo({ name: "", description: "" });
					window.close();
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			alert("게시판명과 소개글을 모두 입력해주세요!");
		}
	};

	return (
		<form onSubmit={handleFormSubmit} className={style.form}>
			<h1 className="">게시판 생성</h1>
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
			<div className={style.board_btns}>
				<button className={style.submit_btn}>등록</button>
				<button className={style.cancel_btn} type="button" onClick={() => window.close()}>
					취소
				</button>
			</div>
		</form>
	);
}

export default CreateBoard;
