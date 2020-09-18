import { FETCH_POSTS, NEW_POST } from "./types";

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

export const newPost = (post) => async (dispatch) => {
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
};
