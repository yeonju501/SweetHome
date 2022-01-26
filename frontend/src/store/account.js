export const LOGIN = "account/LOGIN";

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
