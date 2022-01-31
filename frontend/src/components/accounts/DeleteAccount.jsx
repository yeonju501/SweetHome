import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { DELETE_TOKEN } from "../../store/token";

function DeleteAccount() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const deleteAccount = () => {
		window.confirm("정말로 회원 탈퇴를 진행 하시겠습니까?") &&
			axios({
				url: `${SERVER_URL}/api/members`,
				method: "delete",
			})
				.then(dispatch(DELETE_TOKEN()))
				.then(navigate("/"))
				.catch(toast.error("회원 탈퇴에 실패 하였습니다."));
	};

	return (
		<div onClick={deleteAccount} style={{ color: "red", fontWeight: "600", cursor: "pointer" }}>
			회원 탈퇴
		</div>
	);
}

export default DeleteAccount;
