import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import style from "style/Admin.module.css";

function AdminBoardUpdate() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const location = useLocation();
	const navigate = useNavigate();
	const [boardUpdate, setBoardUpdate] = useState({
		id: "",
		name: "",
		description: "",
	});

	useEffect(() => {
		console.log(location.state.board);
		setBoardUpdate(location.state.board);
	}, []);

	const onChange = (e) => {
		setBoardUpdate({
			...boardUpdate,
			[e.target.id]: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const checkValue = e.target.checkValidity();
		if (checkValue) {
			axios({
				method: "PUT",
				url: `${SERVER_URL}/api/admin/boards/${boardUpdate.id}`,
				data: {
					name: boardUpdate.name,
					description: boardUpdate.description,
				},
			})
				.then(() => {
					navigate(-1);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			alert("모두 입력해주세요");
		}
	};

	return (
		<div className={style.admin_board_update}>
			<h1>게시판 수정</h1>
			<form onSubmit={onSubmit} className={style.admin_board_update_form}>
				<input
					className={style.admin_board_update_input}
					type="text"
					id="name"
					value={boardUpdate.name}
					onChange={onChange}
					required
				/>
				<input
					type="text"
					id="description"
					value={boardUpdate.description}
					onChange={onChange}
					required
					className={style.admin_board_update_input}
				/>
				<div className={style.admin_board_update_btns}>
					<button>등록</button>
					<button type="button">취소</button>
				</div>
			</form>
		</div>
	);
}

export default AdminBoardUpdate;
