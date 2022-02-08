import Cookies from "universal-cookie";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
	const cookies = new Cookies();
	const token = cookies.get("accessToken");
	return token ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default PrivateRoute;
