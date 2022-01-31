import { combineReducers } from "redux";
import token from "./token";
import userInfo from "./user";

const rootReducer = combineReducers({
	token,
	userInfo,
});

export default rootReducer;
