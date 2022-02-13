import axios from "axios";
import errorMessage from "store/errorMessage";
import { cookieDelete } from "utils/manageToken";
import style from "style/Profile.module.css";
function ProfileButtons({ password, isDup }) {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const deleteAccount = () => {
		window.confirm("정말로 회원 탈퇴를 진행 하시겠습니까?") &&
			axios({
				url: `${SERVER_URL}/api/members`,
				method: "delete",
			})
				.then(() => {
					cookieDelete();
					window.location.replace("/");
				})
				.catch((err) => errorMessage(err.response.data.error_code));
	};

	return (
		<div className={style.profile_btn}>
			<button disabled={!password || !(isDup === 2)}>저장</button>
			<button
				type="button"
				onClick={deleteAccount}
				style={{ color: "red", fontWeight: "600", cursor: "pointer" }}
			>
				회원 탈퇴
			</button>
		</div>
	);
}

export default ProfileButtons;
