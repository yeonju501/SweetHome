import { combineReducers } from "redux";
import userInfo from "./user";
import toggle from "./toggle";
import reportInfo from "./report";
const rootReducer = combineReducers({
	userInfo,
	toggle,
	reportInfo,
});

export default rootReducer;
