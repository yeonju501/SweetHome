import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faCheck, faBan } from "@fortawesome/free-solid-svg-icons";
import style from "style/SignIn.module.css";
import { isThisDuplicte } from "utils/accountAxios";

function SignInPassword({ onChange, password, email, isSignUp }) {
	const [passwordType, setPasswordType] = useState({
		type: "password",
		visible: false,
	});

	const [isDup, setIsDup] = useState(0);

	const changePasswordType = () => {
		setPasswordType(() => {
			if (passwordType.visible) return { type: "password", visible: false };
			return { type: "text", visible: true };
		});
	};

	const checkEmailDup = () => {
		const data = { value: email };
		email.trim() && isThisDuplicte("email", data, setIsDup);
	};
	return (
		<div className={style.password}>
			<div className={style.user_name}>
				<input
					type="text"
					placeholder="email"
					id="email"
					onChange={onChange}
					onBlur={checkEmailDup}
					value={email}
				/>
				{isSignUp &&
					((isDup === 1 && <FontAwesomeIcon icon={faBan} className={style.iconDuplicate} />) ||
						(isDup === 2 && <FontAwesomeIcon icon={faCheck} className={style.notDupl} />))}
			</div>

			<div className={style.password_div}>
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
		</div>
	);
}

export default SignInPassword;
