import {
    EVENT_LOGIN_NOK,
    EVENT_LOGIN_OK,
    FETCH_ANNOUNCEMENTS,
    FETCH_POSTS,
    HIDE_MODAL,
    NEW_ANNOUNCEMENT,
    NEW_POST,
    SHOW_MODAL,
    DELETE_ANNOUNCEMENT,
    UPDATE_ANNOUNCEMENT,
    SHOW_ANNOUNCEMENT_FOR_UPDATE,
} from "./action_types";

export const setIsLogged = (isLogged) => async (dispatch) => {
    console.log("LoginAction.js:: setIsLogged:", isLogged);

    dispatch({
        type: isLogged ? EVENT_LOGIN_OK : EVENT_LOGIN_NOK,
        payload: !isLogged,
    });
};

export const fetchPosts = () => async (dispatch) => {
    console.log("Trying to fetch ...");

    const posts = await (
        await fetch("https://jsonplaceholder.typicode.com/posts")
    ).json();

    console.log("Trying to fetch ... posts:", posts);

    dispatch({
        type: FETCH_POSTS,
        payload: posts,
    });
};

export const newPost = (dispatch, post) => {
    process.nextTick(async () => {
        const new_post = await (
            await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(post),
            })
        ).json();

        console.log("new_post:", new_post);

        dispatch({
            type: NEW_POST,
            payload: new_post,
        });
    });

    return { type: "NOTHING" };
};

export const openRootModal = () => (dispatch) => {
    dispatch({ type: SHOW_MODAL, payload: true });
};

export const closeRootModal = () => (dispatch) => {
    dispatch({ type: HIDE_MODAL, payload: false });
};

export const fetchAnnouncements = () => (dispatch) => {
    dispatch({
        type: FETCH_ANNOUNCEMENTS,
        payload: [
            {
                sender_name: "Remy Sharp",
                message_title: "Brunch this weekend?",
                message_body:
                    "— I'll be in your neighborhood doing errands this…",
            },
            {
                sender_name: "Travis Howard",
                message_title: "Summer BBQ",
                message_body: " — Wish I could come, but I'm out of town this…",
            },
            {
                sender_name: "Cindy Baker",
                message_title: "Oui Oui",
                message_body:
                    " — Do you have Paris recommendations? Have you ever…",
            },
        ],
    });
};

export const createAnnouncement = (title, message) => async (dispatch) => {
    const posts = await (
        await fetch("https://jsonplaceholder.typicode.com/posts")
    ).json();

    const announcements = posts.map((post) => {
        return {
            message_title: post.title,
            message_body: post.body,
        };
    });

    const announcement =
        title && message
            ? {
                  message_title: title,
                  message_body: message,
              }
            : announcements[Math.floor(Math.random() * announcements.length)];

    const payload = announcement;

    dispatch({
        type: NEW_ANNOUNCEMENT,
        payload,
    });
};

export const deleteAnnouncement = (announcement_id) => async (dispatch) => {
    dispatch({
        type: DELETE_ANNOUNCEMENT,
        payload: announcement_id,
    });
};

export const updateAnnouncement = (announcement) => async (dispatch) => {
    dispatch({
        type: UPDATE_ANNOUNCEMENT,
        payload: announcement,
    });
};

export const showAnnouncementForUpdate = (announcement_id) => async (
    dispatch
) => {
    dispatch({
        type: SHOW_ANNOUNCEMENT_FOR_UPDATE,
        payload: announcement_id,
    });
};
