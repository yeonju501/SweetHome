import axios from "axios";
import { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import style from "style/Authority.module.css";
import { toast } from "react-toastify";
import errorMessage from "store/errorMessage";
import { cancelOrRefer } from "utils/authorityRequest";

function AptMemberRequest(props) {
	const [addresses, setAddress] = useState({
		address: "",
		building: "",
		unit: "",
		buildingCode: "",
		postalCode: "",
	});
	const [hasRequest, setHasRequest] = useState(false);

	useEffect(() => {
		axios({
			url: `${URL}/api/apts/register`,
			method: "get",
			headers: {
				"Content-type": "application/json",
			},
		})
			.then(() => setHasRequest(true))
			.catch(() => setHasRequest(false));
	}, []);

	const [isModal, setIsModal] = useState(false);
	const { address, building, unit, buildingCode, postalCode } = addresses;
	const [message, setMessage] = useState("");
	const URL = process.env.REACT_APP_SERVER_URL;

	const onChange = (e) => {
		setAddress((prev) => ({ ...prev, [e.target.id]: e.target.value }));
	};

	const changeMessage = (e) => {
		setMessage(e.target.value);
	};
	const checkNum = /[0-9]/;

	const findAddress = () => {
		setIsModal((prev) => !prev);
	};

	const onCancel = (e) => {
		e.preventDefault();
		cancelOrRefer("delete", setHasRequest, false, true);
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
			dong: building,
			ho: unit,
			message,
		};
		e.preventDefault();
		if (checkNum.test(building) && checkNum.test(unit) && buildingCode) {
			window.confirm("한번 제출하면 수정 할 수 없습니다. 제출하시겠습니까?") &&
				axios({
					url: `${URL}/api/apts/register`,
					method: "post",
					headers: {
						"Content-type": "application/json;charset=UTF-8",
					},
					data,
				})
					.then(() => window.location.replace("/"))
					.catch((err) => errorMessage(err.response.data.error_code));
		} else {
			toast.error("모든 정보를 입력해주세요");
		}
	};

	return hasRequest ? (
		<form>
			<h1>
				관리자가 <br /> 인증 신청을 확인중에 있습니다
			</h1>
			<button onClick={onCancel} className={style.btn_cancel_request}>
				인증 신청 취소하기
			</button>
		</form>
	) : (
		<div className={style.apt_member_page}>
			<h1 className={props.moving ? style.hidden : style.apt_member_title}>아파트 세대원 인증</h1>
			<div className={style.apt_member}>
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
						<input
							type="text"
							readOnly
							placeholder="주소"
							value={address}
							className={style.member_address}
						/>
						<br />

						<input
							type="text"
							placeholder="동"
							id="building"
							className={style.building}
							value={building}
							onChange={onChange}
							required
						/>
						<input
							type="text"
							placeholder="호수"
							id="unit"
							className={style.unit}
							value={unit}
							onChange={onChange}
							required
						/>
						<p className={style.desc}>동과 호수에는 숫자만 입력 해주세요</p>
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
			</div>
		</div>
	);
}

export default AptMemberRequest;
