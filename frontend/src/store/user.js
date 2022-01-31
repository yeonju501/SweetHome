const LOGIN = "user/setUserInfo";
const DELETE = "user/deleteUserInfo";

export const DELETE_USER = () => ({ type: DELETE });
export const SET_USER = (data) => ({ type: LOGIN, data });

const initialState = {
	username: "",
	email: "",
};

const userInfo = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				username: action.data.username,
				email: action.data.email,
			};
		case DELETE:
			return {
				...state,
				username: "",
				email: "",
			};
		default:
			return state;
	}
};

export default userInfo;
