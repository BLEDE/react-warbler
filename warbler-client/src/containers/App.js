import React from 'react';
import { Provider } from "react-redux";
import { configureStore } from "../store";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar";
import Main from "./Main";
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import jwtDecode from "jwt-decode";

const store = configureStore()

// hydration: if servers drop or other error, if localstorage
// contains token, current user remains
if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    // prevent manual tampering of key in localstorage
    try {
        store.dispatch(setCurrentUser(jwtDecode(localstorage.jwtToken)));
    } catch(e){
        store.dispatch(setCurrentUser({}))
    }
}

const App = () => (
    <Provider store={store}>
        <Router>
            <div className="onboarding">
                <Navbar />
                <Main />
            </div>
        </Router>
    </Provider>
);

export default App;
