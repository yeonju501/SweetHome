import { combineReducers } from "redux";
import token from "./token";
import userInfo from "./user";
import toggle from "./toggle";

const rootReducer = combineReducers({
	token,
	userInfo,
	toggle,
});

export default rootReducer;
