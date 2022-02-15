import Ad1 from "assets/Ad1.png";
import style from "style/Ad.module.css";

function AD() {
	return (
		<div className={style.ad_div}>
			<img src={Ad1} alt="Banner1" />
		</div>
	);
}

export default AD;
