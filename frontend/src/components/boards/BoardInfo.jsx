import style from "style/BoardInfo.module.css";

function BoardInfo({ board }) {
	return (
		<div className={style.board_info}>
			<p className={style.board_title}>{board.name}</p>
			<p className={style.board_description}>{board.description}</p>
		</div>
	);
}

export default BoardInfo;
