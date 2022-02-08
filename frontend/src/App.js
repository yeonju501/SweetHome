import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import SignIn from "./components/accounts/SignIn";
import Home from "./pages/Home";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import MessageBox from "./pages/MessageBox";
import ReadReceiveMessage from "./components/messages/ReadReceiveMessage";
import ReadSendMessage from "./components/messages/ReadSendMessage";
import SendMessage from "./components/messages/SendMessage";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReadMessageDeatil from "./components/messages/ReadMessageDetail";
import Board from "./components/boards/Board";
import ArticleDetail from "./components/articles/ArticleDetail";
import ArticleUpdate from "./components/articles/ArticleUpdate";
import Navbar from "./components/Navbar";
import Sidebar from "./pages/Sidebar";
import style from "./style/App.module.css";
import { useEffect, useState } from "react";
import { onReissueFail, tokenReissue } from "./utils/manageToken";
import Spinner from "./components/Spinner";

axios.defaults.withCredentials = true;
function App() {
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		try {
			tokenReissue(loginCallBack);
		} catch (e) {
			onReissueFail(loginCallBack);
		}
	}, []);

	function loginCallBack(isLoading) {
		setLoading(isLoading);
	}

	if (loading) {
		return (
			<>
				<Router>
					<Navbar />
					<div className={style.div}>
						<side>
							<Sidebar />
						</side>
						<main>
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/sign-in" element={<SignIn />} />
								<Route path="/sign-up" element={<SignUp />} />
								<Route path="" element={<PrivateRoute />}>
									<Route path="/main" element={<Main />} />
									<Route path="/profile/:username" element={<Profile />} />
									<Route path="/boards/:boardId" element={<Board />} />
									<Route path="/articles/:articleId" element={<ArticleDetail />} />
									<Route path="/articles/:articleId/update" element={<ArticleUpdate />} />
									<Route path="/message-box/" element={<MessageBox />}></Route>
									<Route path="read-receive-message" element={<ReadReceiveMessage />} />
									<Route path="read-send-message" element={<ReadSendMessage />} />
									<Route path="send-message" element={<SendMessage />} />
									<Route path="/read-send-message/message-detail" element={<ReadMessageDeatil />} />
									<Route
										path="/read-receive-message/message-detail"
										element={<ReadMessageDeatil />}
									/>
									<Route
										path="/read-send-message/message-detail/send-message"
										element={<SendMessage />}
									/>
								</Route>
								<Route path="/*" element={<NotFound />} />
							</Routes>
						</main>
					</div>
				</Router>
				<ToastContainer style={{ fontSize: "1.4rem" }} />
			</>
		);
	} else {
		return <Spinner />;
	}
}

export default App;
