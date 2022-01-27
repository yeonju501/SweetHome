import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function BoardList() {
	const token = useSelector((state) => state.token.token);
	const [boards, setBoards] = useState([]);

	useEffect(() => {
		axios({
			url: "http://localhost:8080/api/boards",
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
