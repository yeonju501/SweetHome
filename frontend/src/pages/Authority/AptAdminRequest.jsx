import axios from "axios";
import { useState, useRef, useEffect } from "react";
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
	const [addressInfo, setAddressInfo] = useState("");
	const modal = useRef();

	const [isModal, setIsModal] = useState(false);
	const { address, buildingCode, postalCode } = addresses;
	const [message, setMessage] = useState("");
	const URL = process.env.REACT_APP_SERVER_URL;
	const handleCloseModal = (e) => {
		if (isModal && (!modal.current || !modal.current.contains(e.target))) setIsModal(false);
	};

	useEffect(() => {
		window.addEventListener("click", handleCloseModal);
		return () => {
			window.removeEventListener("click", handleCloseModal);
		};
	}, []);
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
		setAddressInfo(data);
		findAddress();
	};

	const onSubmit = (e) => {
		const data = {
			apt_number: buildingCode,
			sido_name: addressInfo.sido,
			gungu_name: addressInfo.sigungu,
			road_name: address,
			road_apt_num: 69,
			zip_code: addressInfo.zonecode,
			apt_name: addressInfo.buildingName,
			message,
		};
		e.preventDefault();
		if (address) {
			window.confirm("한번 제출하면 수정 할 수 없습니다. 제출하시겠습니까?") &&
				axios({
					url: `${URL}/api/apts/apt-manager`,
					method: "post",
					headers: {
						"Content-type": "application/json;charset=UTF-8",
					},
					data,
				})
					.then(() => {
						alert("신청이 완료되었습니다.");
						window.location.replace("/");
					})
					.catch((err) => errorMessage(err.response.data.error_code));
		} else {
			toast.error("주소를 입력해주세요");
		}
	};

	return (
		<div className={style.apt_member_page}>
			<h1 className={style.apt_member_title}>아파트 관리자 인증</h1>
			<section className={style.apt_member}>
				<form onSubmit={onSubmit} className={style.admin_request}>
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
						<button ref={modal} type="button" onClick={findAddress}>
							주소 찾기
						</button>
						<br />
						<input
							type="text"
							readOnly
							placeholder="주소"
							value={address}
							className={style.admin_address}
						/>
					</div>
					<div>
						<aside>
							<label>기타</label>
						</aside>
						<textarea cols="30" rows="10" onChange={changeMessage}></textarea>
					</div>
					<button className={style.btn_submit}>제출하기</button>
				</form>
				<div>{isModal && <DaumPostcode className={style.showModal} onComplete={onComplete} />}</div>
			</section>
		</div>
	);
}

export default AptAdminRequest;
