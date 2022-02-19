const SET = "article/setArticle";

export const SET_ARTICLE_NUM = (data) => ({ type: SET, data });

const initialState = {
	articleId: "",
};

const articleId = (state = initialState, action) => {
	switch (action.type) {
		case SET:
			return {
				...state,
				articleId: action.data,
			};
		default:
			return state;
	}
};

export default articleId;
