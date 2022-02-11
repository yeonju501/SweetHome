import style from "style/Profile.module.css";

function ProfileUserInput(props, { value, onChange }) {
	return (
		<div className={style.profile_user_info_div}>
			<aside>
				<label htmlFor={props.id}>{props.labelValue}</label>
			</aside>
			<input type="text" id={props.id} value={value || ""} onChange={onChange} />
		</div>
	);
}

export default ProfileUserInput;
