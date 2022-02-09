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
				onLoginSuccess(res);
				loginCallBack(true);
			})
			.catch((err) => {
				if (err.response.data.error_code === "A08") {
					loginCallBack(true);
					onReissueFail();
				}
			});
	} else {
		loginCallBack(true);
		onReissueFail();
	}
}

export function cookieSet(keyName, Value) {
	const expire = 1000 * 3600 * 24 * 7;
	cookies.set(keyName, Value, {
		path: "/",
		secure: true,
		// httpOnly: true,
		expires: new Date(Date.now() + expire),
	});
}

export function onLoginSuccess(res) {
	const { access_token, refresh_token } = res.data;
	axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
	cookieSet("accessToken", access_token);
	cookieSet("refreshToken", refresh_token);
	setTimeout(tokenReissue, JWT_EXPIRE_TIME - 60000);
}

export function onReissueFail(callback) {
	cookies.remove("accessToken");
	cookies.remove("refreshToken");
	callback(true);
}
