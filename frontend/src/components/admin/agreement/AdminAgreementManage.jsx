import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AdminAgreementList from "components/agreements/Agreements";
import style from "style/Admin.module.css";
import { useNavigate } from "react-router-dom";

function AdimnAgreementManage() {
	const navigate = useNavigate();
	const handleCreateBoardClick = () => {
		navigate("/agreement/create");
	};

	return (
		<div className={style.agreement_page}>
			<div className={style.button_box}>
				<button onClick={handleCreateBoardClick} className={style.agreement_create_btn}>
					<FontAwesomeIcon icon={faPlus} style={{ fontSize: "1.2rem" }} />
					동의서 생성
				</button>
			</div>
			<AdminAgreementList />
		</div>
	);
}

export default AdimnAgreementManage;
