import { useEffect } from "react";
import axios from "axios";
function AccountKakao() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;

	useEffect(() => {
		let params = new URL(document.location.toString()).searchParams;
		let code = params.get("code");

		axios
			.get(`${SERVER_URL}/api/oauth2/authorization/kakao?code=${code}`)
			.catch((err) => console.log(err));
	}, []);
	return <div>hi</div>;
}

export default AccountKakao;
