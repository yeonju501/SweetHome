import axios from "axios";
import { useSelector } from "react-redux";

const URL = process.env.REACT_APP_SERVER_URL;

axios.defaults.baseURL = `${URL}/api/`;

axios.interceptors.response.use(
	(res) => res,
	async (error) => {
		if (error.response.status === 401) {
			const response = await axios({
				url: "members/reissue",
				headers: {
					"Content-Type": "application/json;charset=UTF-8",
					access_token,
					refresh_token,
				},
			});

			if (response.status === 200) {
				axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;

				return axios(error.config);
			}
		}
		return error;
	},
);
