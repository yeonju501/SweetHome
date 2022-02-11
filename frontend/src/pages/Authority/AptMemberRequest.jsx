import axios from "axios";
import { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import style from "style/Authority.module.css";

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

	return <div>AptMemberRequest</div>;
}

export default AptMemberRequest;
