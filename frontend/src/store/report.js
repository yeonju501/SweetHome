const SET = "report/setReport";

export const SET_REPORT = (data) => ({ type: SET, data });

const initialState = {
	type: "",
	username: "",
	content: "",
	id: "",
};

const reportInfo = (state = initialState, action) => {
	switch (action.type) {
		case SET:
			return {
				type: action.data.type,
				username: action.data.username,
				content: action.data.content,
				id: action.data.id,
			};
		default:
			return state;
	}
};

export default reportInfo;
