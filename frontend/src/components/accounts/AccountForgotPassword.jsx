import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import errorMessage from "../../store/errorMessage";
import style from "../../style/SignIn.module.css";

function AccountForgotPassword() {
	const URL = process.env.REACT_APP_SERVER_URL;
	const navigate = useNavigate();
	const [email, setEmail] = useState("");

	function onChange(e) {
		setEmail(e.target.value);
	}

	function onSubmit(e) {
		e.preventDefault();
		toast.info("요청을 보내는 중입니다");
		axios({
			url: `${URL}/api/members/find-pw`,
			method: "post",
			headers: { "Content-type": "application/json" },
			data: email,
		})
			.then(() => {
				setEmail("");
				navigate("/");
				toast.success("이메일로 임시 비밀번호가 전송되었습니다");
			})
			.catch((err) => errorMessage(err.response.data.error_code));
	}

	return (
		<div className={style.sign_in}>
			<div className={style.sign_in_div}>
				<h1 className={style.title}>비밀번호 찾기</h1>
				<p className={style.forgot_pw_p}>
					아래에 이메일을 입력하시면 <br />
					임시비밀번호를 입력하신 이메일로 전송합니다
				</p>
				<form className={style.form} onSubmit={onSubmit}>
					<input type="text" placeholder="email" id="email" onChange={onChange} value={email} />
					<button className={style.btn_forgot_pw}>이메일로 임시비밀 번호 받기</button>
				</form>
				<div className={style.forgot_pw_links}>
					<Link to="/sign-up">회원가입 하러 가기</Link>
					<Link to="/sign-in">로그인으로 가기</Link>
				</div>
			</div>
		</div>
	);
}

export default AccountForgotPassword;
