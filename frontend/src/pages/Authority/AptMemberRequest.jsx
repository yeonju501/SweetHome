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
	return <div>AptMemberRequest</div>;
}

export default AptMemberRequest;
