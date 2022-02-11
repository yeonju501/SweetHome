import React from "react";
import { useState } from "react";
import ReactModal from "react-modal";

function AdminBoardUpdate(props) {
	const [boardUpdate, setBoardUpdate] = useState({
		name: "",
		description: "",
	});
	const { isOpen, onCancel, id, name, description } = props;

	function onChange(e) {
		setBoardUpdate({
			...boardUpdate,
			[e.target.id]: e.target.value,
		});
	}

	return (
		<ReactModal isOpen={isOpen}>
			<h1>게시판 수정</h1>
			<form>
				<input type="text" id="name" value={name} onChange={onChange} required />
				<input type="text" id="description" value={description} onChange={onChange} required />
				<button>등록</button>
				<button onClick={() => onCancel()}>취소</button>
			</form>
		</ReactModal>
	);
}

export default AdminBoardUpdate;
