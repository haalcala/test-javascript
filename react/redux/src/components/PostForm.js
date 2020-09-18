import React, { Component } from "react";
import { connect } from "react-redux";
import { newPost } from "../actions/PostActions";

import PropTypes from "prop-types";

class PostForm extends Component {
    state = {
        title: "",
        body: "",
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        const post = {
            title: this.state.title,
            body: this.state.body,
        };

        this.props.newPost(post);
    };

    render() {
        return (
            <div>
                <h1>Add Post</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <br />
                        <input
                            name="title"
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.title}
                        />
                    </div>
                    <div>
                        <label>Body:</label>
                        <br />
                        <textarea
                            name="body"
                            onChange={this.handleChange}
                            value={this.state.body}
                        />
                    </div>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

PostForm.propTypes = {
    newPost: PropTypes.func.isRequired,
};

export default connect(null, { newPost })(PostForm);
