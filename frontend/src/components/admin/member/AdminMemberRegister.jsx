import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import msgStyle from "style/Messages.module.css";
import style from "style/Admin.module.css";
import pagStyle from "style/Pagination.module.css";
import { adminPagination, pageDown, pageUp } from "utils/adminFunction";

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
			url: `${SERVER_URL}/api/admin/apts/register?page=${page}&size=10`,
		})
			.then((res) => {
				setAptMemberRegister(res.data.register_members);
				setPageSize(res.data.total_page_count);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [page]);

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

	return (
		<div className={style.div_container}>
			<table>
				<thead>
					<tr>
						<th>순서</th>
						<th>신청자</th>
						<th>동</th>
						<th>호</th>
						<th>메시지</th>
						<th colSpan="2"></th>
					</tr>
				</thead>
				<tbody>
					{aptMemberRegister.length > 0 ? (
						aptMemberRegister.map((aptMember, idx) => (
							<tr key={idx}>
								<td>{idx + 1}</td>
								<td>{aptMember.name}</td>
								<td>{aptMember.dong}</td>
								<td>{aptMember.ho}</td>
								<td>{aptMember.message}</td>
								<td className={style.admin_mb_btn}>
									<button
										className={style.admin_mb_accept}
										onClick={(e) => {
											registerMember("POST", aptMember.id);
										}}
									>
										승인
									</button>
								</td>
								<td className={style.admin_mb_btn}>
									<button
										className={style.admin_mb_decline}
										onClick={(e) => {
											registerMember("DELETE", aptMember.id);
										}}
									>
										거절
									</button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="7">신청자가 없습니다</td>
						</tr>
					)}
				</tbody>
			</table>
			{aptMemberRegister.length > 0 ? (
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

export default AdminMemberRegister;
