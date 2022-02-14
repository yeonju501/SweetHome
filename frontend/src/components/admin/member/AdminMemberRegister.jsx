import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import msgStyle from "style/Messages.module.css";
import { adminPagination } from "utils/adminFunction";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function AdminMemberRegister() {
	const [aptMemberRegister, setAptMemberRegister] = useState({
		id: "",
		name: "",
		email: "",
		dong: "",
		ho: "",
		message: "",
		phone_number: "",
	});
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(0);

	useEffect(() => {
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/admin/apts/register`,
		})
			.then((res) => {
				setAptMemberRegister(res.data.register_members);
				setPageSize(res.data.total_page_count);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const registerMember = (method_, id) => {
		console.log(method_, id);
		axios({
			method: method_,
			url: `${SERVER_URL}/api/admin/apts/register`,
			data: {
				apt_house_member_id: id,
			},
		}).catch((err) => {
			console.log(err);
		});
	};

	const pageUp = () => {
		if (page + 1 >= pageSize) {
			alert("마지막 페이지 입니다");
		} else {
			setPage(page + 1);
		}
	};

	const pageDown = () => {
		if (page === 0) {
			alert("처음 페이지 입니다");
		} else {
			setPage(page - 1);
		}
	};
	return (
		<>
			<table>
				<thead>
					<tr>
						<th>신청자</th>
						<th>동</th>
						<th>호</th>
						<th>메시지</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{aptMemberRegister.length > 0 ? (
						aptMemberRegister.map((aptMember, idx) => (
							<tr key={idx}>
								<td>{aptMember.name}</td>
								<td>{aptMember.dong}</td>
								<td>{aptMember.ho}</td>
								<td>{aptMember.message}</td>
								<button
									className={msgStyle.send}
									onClick={(e) => {
										registerMember("POST", aptMember.id);
									}}
								>
									승인
								</button>
								<button
									className={msgStyle.delete}
									onClick={(e) => {
										registerMember("DELETE", aptMember.id);
									}}
								>
									거절
								</button>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="6">신청자가 없습니다</td>
						</tr>
					)}
				</tbody>
			</table>
			{aptMemberRegister.length > 0 ? (
				<div>
					<button onClick={pageDown}>&lt;</button>
					{adminPagination(pageSize, setPage)}
					<button onClick={pageUp}>&gt;</button>
				</div>
			) : null}
		</>
	);
}

export default AdminMemberRegister;
