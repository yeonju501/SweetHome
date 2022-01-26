const LOGIN = "token/LOGIN";
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
		default:
			return state;
	}
};

export default access_token;
