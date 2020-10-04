import { combineReducers } from "redux";
import {
    ACTION_LOGIN,
    EVENT_LOGIN_NOK,
    EVENT_LOGIN_OK,
    FETCH_POSTS,
    NEW_POST,
    SHOW_MODAL,
    HIDE_MODAL,
    FETCH_ANNOUNCEMENTS,
    NEW_ANNOUCEMENT,
} from "./action_types";

const LoginReducer = (
    state = {
        loggedIn: false,
        loginError: false,
    },
    action
) => {
    console.log("LoginReducer.js:: state:", state, "action:", action);

    switch (action.type) {
        case EVENT_LOGIN_OK:
            return {
                ...state,
                loggedIn: true,
                loginError: false,
            };
        case EVENT_LOGIN_NOK:
            return {
                ...state,
                loggedIn: false,
                loginError: true,
            };
        default:
            return state;
    }
};

const PostReducer = (
    state = {
        items: [],
        item: "",
    },
    action
) => {
    console.log("PostReducer:: action:", action, "state:", state);
    switch (action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                items: action.payload,
            };
        case NEW_POST:
            const post = action.payload;

            post.id = state.items.length + 1;

            state.items.unshift(post);
            return {
                ...state,
                item: post,
            };
        default:
            return state;
    }
};

const showModalReducer = (state = false, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return true;
        case HIDE_MODAL:
            return false;
        default:
            return state;
    }
};

const annoucementsReducer = (
    state = { announcements: [], new_announcements: [], count: 0 },
    action
) => {
    console.log("annoucementsReducer:: state:", state, "action:", action);
    switch (action.type) {
        case FETCH_ANNOUNCEMENTS:
            return {
                ...state,
                count: state.count + 1,
                announcements: action.payload,
            };
        case NEW_ANNOUCEMENT:
            state.announcements.unshift(...action.payload);

            return { ...state, new_announcements: action.payload };
        default:
            return state;
    }
};

export default combineReducers({
    PostReducer,
    LoginReducer,
    showModal: showModalReducer,
    announcements: annoucementsReducer,
});
