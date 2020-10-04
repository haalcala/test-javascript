import React, { Component, useState } from "react";
import { connect, useDispatch } from "react-redux";

import PropTypes from "prop-types";
import {
    setIsLogged,
    LoginActions,
    newPost,
    openRootModal,
    createAnnouncement,
} from "../actions";
import { Button } from "@material-ui/core";

function PostForm(props) {
    const {
        newPost,
        setIsLogged,
        loggedIn,
        openRootModal,
        createAnnouncement,
    } = props;

    const [state, setState] = useState({
        title: "",
        body: "",
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const post = {
            title: state.title,
            body: state.body,
        };

        dispatch(newPost(dispatch, post));
    };

    return (
        <div>
            <h1>Add Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <br />
                    <input
                        name="title"
                        type="text"
                        onChange={handleChange}
                        value={state.title}
                    />
                </div>
                <div>
                    <label>Body:</label>
                    <br />
                    <textarea
                        name="body"
                        onChange={handleChange}
                        value={state.body}
                    />
                </div>
                <br />
                <button type="submit">Submit</button>
                <br />
                {loggedIn ? (
                    <button
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsLogged(false);
                        }}
                    >
                        Set Not Logged
                    </button>
                ) : (
                    <button
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsLogged(true);
                        }}
                    >
                        Set Logged In
                    </button>
                )}
            </form>
            <Button onClick={openRootModal}>Show Modal</Button>
            <br />
            <Button onClick={createAnnouncement}>New Annoucement</Button>
        </div>
    );
}

PostForm.propTypes = {
    newPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    console.log("PostForm: mapStateToProps:: state:", state);
    return {
        loggedIn: state.LoginReducer.loggedIn,
        loginError: state.LoginReducer.loginError,
    };
};

export default connect(mapStateToProps, {
    newPost,
    setIsLogged,
    openRootModal,
    createAnnouncement,
})(PostForm);

// export default PostForm;
