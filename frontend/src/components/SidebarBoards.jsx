import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Sidebar() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const [boards, setBoards] = useState([]);

	useEffect(() => {
		axios({
			url: `${SERVER_URL}/api/boards`,
			method: "get",
		}).then((res) => {
			setBoards(res.data);
		});
	}, []);

	return (
		<ul>
			{boards.map(({ id, name, description }) => (
				<li key={id}>
					<Link to={`/${name}`} state={{ id, name, description }}>
						{name}
					</Link>
				</li>
			))}
		</ul>
	);
}

export default Sidebar;
