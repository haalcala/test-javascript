import { FETCH_POSTS, NEW_POST } from "../actions/types";

const initialState = {
    items: [],
    item: "",
};

export default (state = initialState, action) => {
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
