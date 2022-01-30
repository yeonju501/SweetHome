import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<ToastContainer>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="" element={<PrivateRoute />}>
						<Route path="/main" element={<Main />} />
						<Route path="/profile/:username" element={<Profile />} />
					</Route>
					<Route path="/message-box/" element={<MessageBox />}>
						<Route path="read-receive-message" element={<ReadReceiveMessage />} />
						<Route path="read-send-message" element={<ReadSendMessage />} />
						<Route path="send-message" element={<SendMessage />} />
					</Route>
				</Routes>
			</Router>
			</ToastContainer>
		</>
	);
}

export default App;
