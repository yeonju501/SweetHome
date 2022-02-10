const SET = "user/setUserInfo";

export const SET_TARGET = (data) => ({ type: SET, data });

const initialState = {
	username: "",
	content: "",
	id: "",
};

const reportInfo = (state = initialState, action) => {
	switch (action.type) {
		case SET:
			return {
				...state,
				username: action.data.username,
				content: action.data.content,
				id: action.data.id,
			};
		default:
			return state;
	}
};

export default reportInfo;
