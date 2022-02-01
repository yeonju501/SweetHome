import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const URL = process.env.REACT_APP_SERVER_URL;
const cookies = new Cookies();

axios.defaults.baseURL = `${URL}/api/`;

axios.interceptors.response.use(
	(res) => res,
	async (error) => {
		const navigate = useNavigate();
		if (error.response.status === 401) {
			const refresh_token = cookies.get("refreshToken");
			const access_token = useSelector((state) => state.token.access_token);
			const data = { access_token, refresh_token };

			const response = await axios({
				url: "members/reissue",
				headers: {
					"Content-Type": "application/json;charset=UTF-8",
				},
				data,
			});

			if (response.status === 200) {
				axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;

				return axios(error.config);
			}
		}
		navigate("/sign-in");
	},
);
