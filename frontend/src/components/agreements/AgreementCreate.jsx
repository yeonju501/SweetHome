import { useState } from "react";
import axios from "axios";
import errorMessage from "store/errorMessage";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";

function AgreementCreate(props) {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const [agreementData, setAgreementData] = useState({
		title: "",
		content: "",
		start_date: "",
		end_date: "",
	});
	const { title, content, start_date, end_date } = agreementData;
	const navigate = useNavigate();
	const { isOpen, onCancel } = props;

	const handleFormSubmit = (e) => {
		e.preventDefault();

		axios({
			url: `${SERVER_URL}/api/admin/agreements`,
			method: "post",
			data: {
				title,
				content,
				start_date: `${start_date}T00:00:00`,
				end_date: `${end_date}T23:59:59`,
			},
		})
			.then(() => {
				setAgreementData({
					title: "",
					content: "",
					start_date: "",
					end_date: "",
				});
				onCancel();
			})
			.catch((err) => {
				errorMessage(err.response.data.error_code);
			});
	};

	const handleInputChange = (e) => {
		setAgreementData({ ...agreementData, [e.target.id]: e.target.value });
	};

	const handleCancelButton = (e) => {
		e.preventDefault();
		navigate("/agreement");
	};

	return (
		<ReactModal isOpen={isOpen} onRequestClose={() => onCancel()}>
			<h1>동의서 작성</h1>
			<form onSubmit={handleFormSubmit}>
				<input
					type="text"
					id="title"
					value={title}
					onChange={handleInputChange}
					placeholder="제목을 입력하세요"
				/>
				<label>시작 날짜</label>
				<input type="date" id="start_date" value={start_date} onChange={handleInputChange} />
				<label>종료 날짜</label>
				<input type="date" id="end_date" value={end_date} onChange={handleInputChange} />

				<textarea
					id="content"
					placeholder="동의서 내용을 입력하세요"
					value={content}
					onChange={handleInputChange}
				></textarea>
				<button>작성</button>
				<button onClick={handleCancelButton}>취소</button>
			</form>
		</ReactModal>
	);
}

export default AgreementCreate;
