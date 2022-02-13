import axios from "axios";
import { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import style from "style/Authority.module.css";
import errorMessage from "store/errorMessage";
import { toast } from "react-toastify";

function AptAdminRequest() {
	const [addresses, setAddress] = useState({
		address: "",
		buildingCode: "",
		postalCode: "",
	});

	const [isModal, setIsModal] = useState(false);
	const { address, buildingCode, postalCode } = addresses;
	const [message, setMessage] = useState("");
	const URL = process.env.REACT_APP_SERVER_URL;

	const changeMessage = (e) => {
		setMessage(e.target.value);
	};

	const findAddress = () => {
		setIsModal((prev) => !prev);
	};

	const onComplete = (data) => {
		let addr;
		data.userSelectedType === "R" ? (addr = data.roadAddress) : (addr = data.jibunAddress);
		setAddress({
			...addresses,
			address: addr,
			postalCode: data.zonecode,
			buildingCode: data.buildingCode,
		});
		findAddress();
	};

	const onSubmit = (e) => {
		const data = {
			apt_number: buildingCode,
			message,
		};
		e.preventDefault();
		if (address) {
			window.confirm("한번 제출하면 수정 할 수 없습니다. 제출하시겠습니까?") &&
				axios({
					url: `${URL}/api/apts/register`,
					method: "post",
					headers: {
						"Content-type": "application/json;charset=UTF-8",
					},
					data,
				})
					.then((res) => console.log(res))
					.catch((err) => errorMessage(err.response.data.error_code));
		} else {
			toast.error("주소를 입력해주세요");
		}
	};

	return (
		<div className={style.apt_member_page}>
			<h1 className={style.apt_member_title}>아파트 관리자 인증</h1>
			<section className={style.apt_member}>
				<form onSubmit={onSubmit}>
					<div className={style.apt_member_form_div}>
						<aside>
							<label>주소 입력하기</label>
						</aside>
						<input
							type="text"
							readOnly
							placeholder="우편번호"
							className={style.postal_code}
							value={postalCode}
						/>
						<button type="button" onClick={findAddress}>
							주소 찾기
						</button>
						<br />
						<input type="text" readOnly placeholder="주소" value={address} />
					</div>
					<div>
						<aside>
							<label>기타</label>
						</aside>
						<textarea cols="30" rows="10" onChange={changeMessage}></textarea>
					</div>
					<button className={style.btn_submit}>제출하기</button>
				</form>
				<div>
					<div>
						{isModal ? <DaumPostcode className={style.showModal} onComplete={onComplete} /> : null}
					</div>
				</div>
			</section>
		</div>
	);
}

export default AptAdminRequest;
