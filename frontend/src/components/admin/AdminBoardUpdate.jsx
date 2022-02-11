import React from "react";
import ReactModal from "react-modal";

function AdminBoardUpdate(props) {
	const { isOpen, onCancel, id, name, description } = props;
	return (
		<ReactModal isOpen={isOpen}>
			<form>
				<h1>게시판 수정</h1>
				<input type="text" id="name" value={name} />
				<input type="text" id="description" value={description} />
				<button>등록</button>
				<button onClick={() => onCancel()}>취소</button>
			</form>
		</ReactModal>
	);
}

export default AdminBoardUpdate;
