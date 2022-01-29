import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function BoardList() {
	const token = useSelector((state) => state.token.token);
	const [boards, setBoards] = useState([]);

	useEffect(() => {
		axios({
			url: `${SERVER_URL}/api/boards`,
			headers: { Authorization: `Bearer ${token}` },
			method: "get",
		})
			.then((res) => {
				console.log(res);
				setBoards(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<ul>
			{boards.map((board, idx) => (
				<li key={idx}>{board.name}</li>
			))}
		</ul>
	);
}

export default BoardList;
