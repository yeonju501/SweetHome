import axios from "axios";
import Cookies from "universal-cookie";
import { tokenReissue } from "utils/manageToken";

axios.defaults.baseURL = `${URL}/api/`;
let refresh = false;
const cookies = new Cookies();

axios.interceptors.response.use(
	(res) => res,
	async (err) => {
		const { config } = err;
		if (err.response.status === 403 && !refresh) {
			const originalRequest = config;
			refresh = true;
			tokenReissue();
			originalRequest.headers.Authorization = `Bearer ${cookies.get("accessToken")}`;
			refresh = false;
			return axios(originalRequest);
		} else {
			refresh = false;
			return Promise.reject(err);
		}
	},
);
