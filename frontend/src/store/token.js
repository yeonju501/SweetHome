const LOGIN = "token/LOGIN";
const DELETE = "token/DELETE_TOKEN";

export const DELETE_TOKEN = () => ({ type: DELETE });
export const SET_TOKEN = (token) => ({ type: LOGIN, token });

const initialState = {
	token: "",
};

const access_token = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				token: action.token,
			};
		case DELETE:
			return {
				...state,
				token: "",
			};
		default:
			return state;
	}
};

export default access_token;
