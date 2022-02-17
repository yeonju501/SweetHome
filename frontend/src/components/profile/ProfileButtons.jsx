import style from "style/Profile.module.css";

function ProfileButtons({ password, isDup }) {
	const onCancel = () => {
		window.location.href = "/";
	};
	return (
		<div className={style.profile_btn}>
			<div className={style.profile_btns}>
				<button disabled={!(isDup === 2)}>저장</button>
				<button onClick={onCancel}>취소</button>
			</div>
		</div>
	);
}

export default ProfileButtons;
