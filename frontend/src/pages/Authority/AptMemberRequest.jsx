import axios from "axios";
import { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import style from "style/Authority.module.css";
import { toast } from "react-toastify";
import errorMessage from "store/errorMessage";

function AptMemberRequest() {
	const [addresses, setAddress] = useState({
		address: "",
		building: "",
		unit: "",
		buildingCode: "",
		postalCode: "",
	});

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
		console.log(data);
		if (checkNum.test(building) && checkNum.test(unit)) {
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
			toast.error("동, 호수에는 숫자만 입력해주세요");
		}
	};

	return (
		<div className={style.apt_member}>
			<h1>아파트 세대원 인증</h1>
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
	);
}

export default AptMemberRequest;
