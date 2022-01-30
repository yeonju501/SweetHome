import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
	const token = useSelector((state) => state.token.accessToken);

	return token ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default PrivateRoute;
