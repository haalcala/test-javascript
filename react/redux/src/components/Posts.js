import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/PostActions";
import PropTypes from "prop-types";

class Posts extends Component {
    componentWillMount() {
        this.props.fetchPosts();
    }

    render() {
        console.log("Posts.js:: render: this.props:", this.props);

        const postItems = this.props.posts.map((post) => (
            <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
            </div>
        ));

        return (
            <div>
                <h1>Posts!!</h1>
                {postItems}
            </div>
        );
    }
}

Posts.PropType = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    newPost: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    console.log("mapStateToProps:: state:", state);
    return {
        posts: state.PostReducer.items,
        newPost: state.PostReducer.item,
    };
};

export default connect(mapStateToProps, { fetchPosts })(Posts);
