import { combineReducers } from "redux";
import access_token from "./token";

const rootReducer = combineReducers({
	token: access_token,
});

export default rootReducer;
