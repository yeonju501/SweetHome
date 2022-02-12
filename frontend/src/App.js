import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import SignIn from "components/accounts/AccountSignIn";
import Home from "pages/Home";
import Main from "pages/Main";
import SignUp from "pages/SignUp";
import PrivateRoute from "components/PrivateRoute";
import Profile from "pages/Profile";
import MessageBox from "pages/MessageBox";
import ReadReceiveMessage from "components/messages/ReadReceiveMessage";
import ReadSendMessage from "components/messages/ReadSendMessage";
import SendMessage from "components/messages/SendMessage";
import NotFound from "pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReadMessageDeatil from "components/messages/ReadMessageDetail";
import Board from "components/boards/Board";
import ArticleDetail from "components/articles/ArticleDetail";
import ArticleUpdate from "components/articles/ArticleUpdate";
import Navbar from "components/Navbar";
import Sidebar from "pages/Sidebar";
import style from "style/App.module.css";
import { useEffect, useState } from "react";
import { onReissueFail, tokenReissue } from "utils/manageToken";
import Spinner from "components/Spinner";
import AccountKakao from "components/accounts/AccountKakao";
import Admin from "pages/Admin";
import AdminMemberManage from "components/admin/AdminMemberManage";
import Agreements from "components/agreements/Agreements";
import AgreementCreate from "components/agreements/AgreementCreate";
import AccountForgotPassword from "components/accounts/AccountForgotPassword";
import AgreementDetail from "components/agreements/AgreementDetail";
import Report from "components/reports/Report";
import SiteAdmin from "components/site/SiteAdmin";
import { useSelector } from "react-redux";
import AptMemberRequest from "pages/Authority/AptMemberRequest";
import AptAdminRequest from "pages/Authority/AptAdminRequest";
import AdminBoardManage from "components/admin/AdminBoardManage";
import Footer from "components/Footer";
import AdminBoardUpdate from "components/admin/AdminBoardUpdate";
import AdminReportManage from "components/admin/AdminReportManage";

axios.defaults.withCredentials = true;
function App() {
	const authority = useSelector((state) => state.userInfo.authority);

	const [loading, setLoading] = useState(false);
	useEffect(() => {
		try {
			tokenReissue(loginCallBack);
		} catch (e) {
			onReissueFail(loginCallBack);
		}
		console.log(authority);
	}, []);

	function loginCallBack(isLoading) {
		setLoading(isLoading);
	}

	const authorityCheck = (authority) => {
		if (authority === "준회원") return false;
		else if (authority === "") return false;
		else return true;
	};

	if (loading) {
		return (
			<div className={style.app_js}>
				<Router>
					{authority && (
						<nav>
							<Navbar />
						</nav>
					)}
					<div className={authority ? style.div : style.public}>
						{authorityCheck(authority) && (
							<aside className={style.aside}>
								<Sidebar />
							</aside>
						)}
						<main className={authority ? style.main : style.public}>
							<Routes className={style}>
								<Route path="/" element={<Home />} />
								<Route path="/sign-in" element={<SignIn />} />
								<Route path="/sign-up" element={<SignUp />} />
								<Route path="/oauth2/code/kakao" element={<AccountKakao />} />
								<Route path="/forgot-password" element={<AccountForgotPassword />} />
								<Route path="" element={<PrivateRoute />}>
									<Route path="/main" element={<Main />} />
									<Route path="/profile/:username" element={<Profile />} />
									<Route path="/agreements" element={<Agreements />} />
									<Route path="/agreement/:agreementId" element={<AgreementDetail />} />
									<Route path="/agreement/create" element={<AgreementCreate />} />
									<Route path="/boards/:boardId" element={<Board />} />
									<Route path="/articles/:articleId" element={<ArticleDetail />} />
									<Route path="/articles/:articleId/update" element={<ArticleUpdate />} />
									<Route path="/message-box/" element={<MessageBox />}></Route>
									<Route path="read-receive-message" element={<ReadReceiveMessage />} />
									<Route path="read-send-message" element={<ReadSendMessage />} />
									<Route path="send-message" element={<SendMessage />} />
									<Route path="/read-send-message/message-detail" element={<ReadMessageDeatil />} />
									<Route path="/report" element={<Report />} />
									<Route
										path="/read-receive-message/message-detail"
										element={<ReadMessageDeatil />}
									/>
									<Route
										path="/read-send-message/message-detail/send-message"
										element={<SendMessage />}
									/>
									<Route path="/request/apt-member" element={<AptMemberRequest />} />
									<Route path="/request/apt-admin" element={<AptAdminRequest />} />
									<Route path="/admin" element={<Admin />} />
									<Route path="/site" element={<SiteAdmin />} />
									<Route path="member-manage" element={<AdminMemberManage />} />
									<Route path="board-manage" element={<AdminBoardManage />} />
									<Route path="board-manage/board-update" element={<AdminBoardUpdate />} />
									<Route path="report-manage" element={<AdminReportManage />} />
								</Route>
								<Route path="/*" element={<NotFound />} />
							</Routes>
						</main>
					</div>
					<Footer />
				</Router>

				<ToastContainer style={{ fontSize: "1.4rem" }} />
			</div>
		);
	} else {
		return <Spinner />;
	}
}

export default App;
