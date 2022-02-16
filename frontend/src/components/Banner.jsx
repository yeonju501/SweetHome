import Banner1 from "assets/banner1.png";
import Banner2 from "assets/banner2.png";
import style from "style/Ad.module.css";

function Banner() {
	return (
		<div className={style.ad_div}>
			<img src={Banner1} alt="Ad1" className={style.ad} />
			<img src={Banner2} alt="Ad2" className={style.ad} />
		</div>
	);
}

export default Banner;
