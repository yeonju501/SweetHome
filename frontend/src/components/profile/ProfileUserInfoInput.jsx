import style from "style/Profile.module.css";

function ProfileUserInfoInput({ type = "text", value, onChange, inputId, naming }) {
	return (
		<>
			<div className={style.profile_user_info_div}>
				<aside>
					<label htmlFor={inputId}>{naming}</label>
				</aside>
				<div className={style.user_name}>
					<input type={type} id={inputId} value={value} onChange={onChange} />
				</div>
			</div>
		</>
	);
}

export default ProfileUserInfoInput;
