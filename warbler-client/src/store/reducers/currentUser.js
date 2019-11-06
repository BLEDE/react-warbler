import { SET_CURRENT_USER } from "../actionTypes";

const DEFAULT_STATE = {
    isAuthenticated: false, // hopefully true when logged in
    user: {} // user info when logged in
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                // !! turns empty object to false, if there are keys it is true
                isAuthenticated: !!Object.keys(action.user).length,
                user: action.user
            };
        default:
            return state;
    }
};