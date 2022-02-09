import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import style from "../../style/SignIn.module.css";

function SignInPassword({ onChange, password }) {
	const [passwordType, setPasswordType] = useState({
		type: "password",
		visible: false,
	});

	const changePasswordType = () => {
		setPasswordType(() => {
			if (!passwordType.visible) {
				return { type: "text", visible: true };
			}
			return { type: "password", visible: false };
		});
	};

	return (
		<div className={style.password}>
			<input
				type={passwordType.type}
				placeholder="숫자 + 문자로 비밀번호를 입력하세요"
				onChange={onChange}
				value={password}
				id="password"
			/>
			{passwordType.visible ? (
				<FontAwesomeIcon
					icon={faEye}
					className={password.length ? `${style.icon}` : `${style.hidden}`}
					onClick={changePasswordType}
				/>
			) : (
				<FontAwesomeIcon
					icon={faEyeSlash}
					className={password.length ? `${style.icon}` : `${style.hidden}`}
					onClick={changePasswordType}
				/>
			)}
		</div>
	);
}

export default SignInPassword;
