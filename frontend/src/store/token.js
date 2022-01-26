export const LOGIN = "account/LOGIN";
export const SET_TOKEN = (token) => ({ type: LOGIN, token });

const token = (state = {}, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				access_token: action.count,
			};
		default:
			return state;
	}
};

export default token;
