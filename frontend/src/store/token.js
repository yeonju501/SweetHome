const LOGIN = "token/LOGIN";
const DELETE = "token/DELETE_TOKEN";

export const DELETE_TOKEN = () => ({ type: DELETE });
export const SET_TOKEN = (token) => ({ type: LOGIN, token });

const initialState = {
	accessToken: "",
	refreshToken: "",
};

const token = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				accessToken: action.token.access_token,
				refreshToken: action.token.refresh_token,
			};
		case DELETE:
			return {
				...state,
				accessToken: "",
				refreshToken: "",
			};
		default:
			return state;
	}
};

export default token;
