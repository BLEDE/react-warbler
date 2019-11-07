import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";

const rootReducer = combineReducers({
    currentUser,
    errors,
    messages
});

export default rootReducer;