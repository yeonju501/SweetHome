import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

axios.defaults.baseURL = `${URL}/api/`;
let refresh = false;

axios.interceptors.response.use(
	(res) => res,
	async (err) => {
		const { config } = err;
		if (err.response.status === 403 && !refresh) {
			const originalRequest = config;
			const refresh_token = cookies.get("refreshToken");
			const access_token = cookies.get("accessToken");
			refresh = true;
			const response = await axios({
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
			});
			if (response.status === 200) {
				const expires = 1000 * 3600 * 24 * 7;
				axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;
				cookies.set("refreshToken", response.data.refresh_token, {
					path: "/",
					secure: true,
					// httpOnly: true,
					expires: new Date(Date.now() + expires),
				});
				cookies.set("accessToken", response.data.access_token, {
					path: "/",
					secure: true,
					// httpOnly: true,
					expires: new Date(Date.now() + 1000 * 60 * 30),
				});

				originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
				refresh = false;
				return axios(originalRequest);
			}
		}
		refresh = false;
		return Promise.reject(err);
	},
);
