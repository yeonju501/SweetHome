import axios from "axios";
import ProfilePagination from "components/profile/ProfilePagination";
import React, { useState } from "react";
import { useEffect } from "react";
import style from "style/Admin.module.css";

function AdminMemberList() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const [data, setData] = useState({ members: [], totalPage: 0, currentPage: 0 });
	const { members, totalPage, currentPage } = data;

	const getList = () => {
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/admin/apts/members?page=${currentPage}&size=10`,
		})
			.then((res) => {
				setData({ ...data, members: res.data.apt_members, totalPage: res.data.total_page_count });
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		getList();
	}, [currentPage]);

	const expelMember = (id) => {
		if (window.confirm("정말로 추방하시겠습니까?")) {
			axios({
				method: "DELETE",
				url: `${SERVER_URL}/api/admin/apts/members/${id}`,
			})
				.then(() => getList())
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<div>
			<table className={style.admin_mb_table}>
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
					{members.length > 0 ? (
						members.map((aptMember, idx) => (
							<tr key={idx}>
								<td>{idx + 1}</td>
								<td>{aptMember.email}</td>
								<td>{aptMember.name}</td>
								<td>{aptMember.dong}</td>
								<td>{aptMember.ho}</td>
								<td>{aptMember.phone_number}</td>
								<td>
									<button
										className={style.delete}
										onClick={() => {
											expelMember(aptMember.id);
										}}
									>
										추방
									</button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="6">회원이 없습니다</td>
						</tr>
					)}
				</tbody>
			</table>
			{totalPage.length > 1 && (
				<ProfilePagination page={currentPage} total={totalPage} setData={setData} />
			)}
		</div>
	);
}

export default AdminMemberList;
