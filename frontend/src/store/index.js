import { combineReducers } from "redux";
import userInfo from "./user";
import toggle from "./toggle";

const rootReducer = combineReducers({
	userInfo,
	toggle,
});

export default rootReducer;
