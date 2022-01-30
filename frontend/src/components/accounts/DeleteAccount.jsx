import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
function DeleteAccount() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const token = useSelector((state) => state.token.token);
	const navigate = useNavigate();

	const deleteAccount = () => {
		window.confirm("정말로 회원 탈퇴를 진행 하시겠습니까?") &&
			axios({
				url: `${SERVER_URL}/api/members`,
				method: "delete",
				headers: { Authorization: `Bearer ${token}` },
			})
				.then(navigate("/"))
				.catch((err) => console.log(err));
	};

	return <div onClick={deleteAccount}>회원 탈퇴</div>;
}

export default DeleteAccount;
