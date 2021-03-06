import style from "style/SignIn.module.css";
import { useNavigate } from "react-router";
import kakao from "assets/kakaologin.png";

function AccountKakaoButton() {
	const navigate = useNavigate();
	const API = process.env.REACT_APP_KAKAO_API_KEY;
	const KAKAO_URI = process.env.REACT_APP_KAKAO_URI;

	const loginWithKakao = () => {
		window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${API}&redirect_uri=${KAKAO_URI}&response_type=code`;
	};

	return (
		<button className={style.kakao_button} onClick={loginWithKakao}>
			<img src={kakao} alt="" className={style.kakao_button} />
		</button>
	);
}

export default AccountKakaoButton;
