import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/accounts/SignIn";
import Home from "./pages/Home";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="" element={<PrivateRoute />}>
					<Route path="/main" element={<Main />} />
					<Route path="/profile/:username" element={<Profile />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
