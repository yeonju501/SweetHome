import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();
const refresh_token = cookies.get("refreshToken");
const access_token = cookies.get("accessToken");
const JWT_EXPIRE_TIME = 1000 * 60 * 30;

export function tokenReissue(loginCallBack) {
	if (refresh_token && access_token) {
		axios({
			url: "http://localhost:8080/api/members/reissue",
			method: "post",
			withCredentials: true,
			headers: {
				"Content-type": "application/json",
				Authorization: "",
			},
			data: {
				access_token,
				refresh_token,
			},
		})
			.then((res) => {
				onLoginSucess(res);
				loginCallBack();
			})
			.catch((err) => loginCallBack());
	}
}
