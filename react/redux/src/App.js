import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import PostForm from "./components/PostForm";
import Posts from "./components/Posts";
import store from "./components/store";
import Root from "./components/root";
import LeftSideBarHeader from "./components/left_sidebar_header";
import { Container } from "@material-ui/core";

function App() {
    return (
        <Provider store={store}>
            <div
                className="App"
                style={{
                    border: "1px solid red",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Root />
                <Container
                    style={{
                        margin: 0,
                        float: "left",
                        width: "300px",
                        border: "1px solid red",
                        display: "block",
                    }}
                >
                    <LeftSideBarHeader />
                </Container>
                <PostForm />
                <hr />
                <Posts />
            </div>
        </Provider>
    );
}

export default App;
