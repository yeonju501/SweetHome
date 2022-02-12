import React from "react";
import { useState } from "react";

function AdminBoardUpdate() {
	const [boardUpdate, setBoardUpdate] = useState({
		name: "",
		description: "",
	});

	function onChange(e) {
		setBoardUpdate({
			...boardUpdate,
			[e.target.id]: e.target.value,
		});
	}

	return (
		<>
			<h1>게시판 수정</h1>
			<form>
				<input type="text" id="name" required />
				<input type="text" id="description" required />
				<button>등록</button>
				<button>취소</button>
			</form>
		</>
	);
}

export default AdminBoardUpdate;
