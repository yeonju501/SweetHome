import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/accounts/SignIn";
import Home from "./pages/Home";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="/main" element={<Main />} />
				<Route path="/profile" element={<PrivateRoute />}></Route>
			</Routes>
		</Router>
	);
}

export default App;
