import axios from "axios";
import { useEffect, useState } from "react";

function ReportType() {
	const URL = process.env.REACT_APP_SERVER_URL;
	const [types, setTypes] = useState([]);
	useEffect(() => {
		axios.get(`${URL}/api/boards/reporttypes`).then((res) => setTypes(res.data));
	});
	return (
		<div>
			{types.map((type) => (
				<li>{type.content}</li>
			))}
		</div>
	);
}

export default ReportType;
