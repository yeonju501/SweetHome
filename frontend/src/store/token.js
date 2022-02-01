const LOGIN = "token/LOGIN";
const DELETE = "token/DELETE_TOKEN";

export const DELETE_TOKEN = () => ({ type: DELETE });
export const SET_TOKEN = (token) => ({ type: LOGIN, token });

const initialState = {
	accessToken: "",
};

const token = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				accessToken: action.token.access_token,
			};
		case DELETE:
			return {
				...state,
				accessToken: "",
			};
		default:
			return state;
	}
};

export default token;
