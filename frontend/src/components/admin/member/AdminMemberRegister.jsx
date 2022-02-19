import { useState, useEffect } from "react";
import axios from "axios";
import style from "style/Admin.module.css";
import ProfilePagination from "components/profile/ProfilePagination";

function AdminMemberRegister() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const [data, setData] = useState({ members: [], totalPage: 0, currentPage: 0 });
	const { members, totalPage, currentPage } = data;

	useEffect(() => {
		getRegisterMember();
	}, [currentPage]);

	const getRegisterMember = () => {
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/admin/apts/register?page=${currentPage}&size=10`,
		})
			.then((res) => {
				setData({
					...data,
					totalPage: res.data.total_page_count,
					members: res.data.register_members,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const registerMember = (method_, id) => {
		axios({
			method: method_,
			url: `${SERVER_URL}/api/admin/apts/register`,
			data: {
				apt_house_member_id: id,
			},
		})
			.then(() => {
				getRegisterMember();
			})
			.catch((err) => {
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
					{members.length > 0 ? (
						members.map((aptMember, idx) => (
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
										onClick={() => {
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
			{totalPage > 1 && (
				<ProfilePagination page={currentPage} total={totalPage} setData={setData} />
			)}
		</div>
	);
}

export default AdminMemberRegister;
