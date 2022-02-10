import { useEffect } from "react";
import axios from "axios";
import { onLoginSuccess } from "../../utils/manageToken";
import Spinner from "../Spinner";

function AccountKakao() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;

	useEffect(() => {
		let params = new URL(document.location.toString()).searchParams;
		let code = params.get("code");
		axios
			.get(`${SERVER_URL}/api/oauth2/authorization/kakao?code=${code}`)
			.then((res) => {
				onLoginSuccess(res);
				window.location.replace("/main");
			})
			.catch(() => window.location.replace("/error"));
	}, []);
	return (
		<div>
			<Spinner />
		</div>
	);
}

export default AccountKakao;
