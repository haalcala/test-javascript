import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "../reducers";

const initialState = {
    initial_state_from_store: 1,
};

const middlewares = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middlewares),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;
