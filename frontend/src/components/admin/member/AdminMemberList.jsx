import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import msgStyle from "style/Messages.module.css";
import adminStyle from "style/Admin.module.css";
import pagStyle from "style/Pagination.module.css";
import { adminPagination, pageDown, pageUp } from "utils/adminFunction";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function AdminMemberList() {
	const [aptMembers, setAptMembers] = useState({
		id: "",
		name: "",
		email: "",
		phone_number: "",
		dong: "",
		ho: "",
	});
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(0);

	useEffect(() => {
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/admin/apts/members?page=${page}&size=10`,
		})
			.then((res) => {
				setAptMembers(res.data.apt_members);
				setPageSize(res.data.total_page_count);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [page]);

	const expelMember = (id) => {
		console.log(id);
		axios({
			method: "DELETE",
			url: `${SERVER_URL}/api/admin/apts/members/${id}`,
		}).catch((err) => {
			console.log(err);
		});
	};

	return (
		<div className={adminStyle.div_container}>
			<table>
				<thead>
					<tr>
						<th>순서</th>
						<th>이메일</th>
						<th>닉네임</th>
						<th>동</th>
						<th>호</th>
						<th>연락처</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{aptMembers.length > 0 ? (
						aptMembers.map((aptMember, idx) => (
							<tr key={idx}>
								<td>{idx + 1}</td>
								<td>{aptMember.email}</td>
								<td>{aptMember.name}</td>
								<td>{aptMember.dong}</td>
								<td>{aptMember.ho}</td>
								<td>{aptMember.phone_number}</td>
								<button
									className={adminStyle.delete}
									onClick={(e) => {
										expelMember(aptMember.id);
									}}
								>
									추방
								</button>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="6">회원이 없습니다</td>
						</tr>
					)}
				</tbody>
			</table>
			{aptMembers.length > 0 ? (
				<div className={pagStyle.pagination}>
					<button
						className={pagStyle.btn_pagination}
						onClick={() => pageDown(page, pageSize, setPage)}
					>
						&lt;
					</button>
					{adminPagination(pageSize, setPage)}
					<button
						className={pagStyle.btn_pagination}
						onClick={() => pageUp(page, pageSize, setPage)}
					>
						&gt;
					</button>
				</div>
			) : null}
		</div>
	);
}

export default AdminMemberList;
