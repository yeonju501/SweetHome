import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function AdminBoardUpdate() {
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
				.then((res) => {
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
		<>
			<form onSubmit={onSubmit}>
				<input type="text" id="name" value={boardUpdate.name} onChange={onChange} required />
				<input
					type="text"
					id="description"
					value={boardUpdate.description}
					onChange={onChange}
					required
				/>
				<button>등록</button>
				<button>취소</button>
			</form>
		</>
	);
}

export default AdminBoardUpdate;
