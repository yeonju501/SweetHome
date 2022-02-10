import style from "style/SignIn.module.css";

export function SignUpButton(props) {
	return (
		<div>
			{props.valid ? (
				<button className={style.login_button}>가입</button>
			) : (
				<button className={`${style.login_button} ${style.disabled_button}`} disabled>
					가입
				</button>
			)}
		</div>
	);
}

export function SignInButton(props) {
	return (
		<div>
			{props.valid ? (
				<button className={style.login_button}>로그인</button>
			) : (
				<button className={`${style.login_button} ${style.disabled_button}`} disabled>
					로그인
				</button>
			)}
		</div>
	);
}
