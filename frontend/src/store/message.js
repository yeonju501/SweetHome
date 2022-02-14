const SET = "message/setMessage";

export const SET_MESSAGE = (data) => ({ type: SET, data });

const initialState = {
	username: "",
};

const messageInfo = (state = initialState, action) => {
	switch (action.type) {
		case SET:
			return {
				...state,
				username: action.data.username,
			};
		default:
			return state;
	}
};

export default messageInfo;
