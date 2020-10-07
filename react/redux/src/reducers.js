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
    NEW_ANNOUNCEMENT,
    SHOW_ANNOUNCEMENT_FOR_UPDATE,
    UPDATE_ANNOUNCEMENT,
    DELETE_ANNOUNCEMENT,
} from "./action_types";
import { new_announcements } from "./selectors";

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

const announcements = (
    state = {
        announcements: [],
        new_announcements: [],
        announcement_to_update: null,
    },
    action
) => {
    console.log(
        "announcements:: state:",
        state,
        "action:",
        action,
        action.type === "SHOW_ANNOUNCEMENT_FOR_UPDATE"
    );
    switch (action.type) {
        case FETCH_ANNOUNCEMENTS:
            return {
                ...state,
                announcements: action.payload,
            };
        case NEW_ANNOUNCEMENT:
            const _announcements = [
                {
                    ...action.payload,
                    id: state.announcements.length + 1,
                    created: new Date().toString(),
                    validity: new Date(
                        new Date().getTime() + 60 * 60 * 24
                    ).toString(),
                },
            ];

            console.log(
                "1111 _announcements:",
                _announcements,
                typeof _announcements
            );

            return {
                ...state,
                new_announcements:
                    _announcements.length > 0
                        ? state.new_announcements.concat(_announcements)
                        : [],
                announcements: _announcements.concat(state.announcements),
            };
        case SHOW_ANNOUNCEMENT_FOR_UPDATE:
            let announcement_to_update = null;

            state.announcements.map((announcement) => {
                if (action.payload == announcement.id)
                    announcement_to_update = announcement;
            });

            return {
                ...state,
                announcement_to_update,
            };
        case UPDATE_ANNOUNCEMENT:
            state.announcements.map((announcement) => {
                if (action.payload.id == announcement.id) {
                    announcement.message_title = action.payload.message_title;
                    announcement.message_body = action.payload.message_body;
                }
            });

            return {
                ...state,
                announcement_to_update: null,
            };
        case DELETE_ANNOUNCEMENT:
            let announcement_id_to_delete;

            state.announcements.map((announcement, index) => {
                if (action.payload == announcement.id) {
                    announcement_id_to_delete = index;
                }
            });

            if (announcement_id_to_delete >= 0) {
                state.announcements.splice(announcement_id_to_delete, 1);
            }

            return { ...state };
        default:
            return state;
    }
};

export default combineReducers({
    PostReducer,
    LoginReducer,
    showModal: showModalReducer,
    announcements,
});
