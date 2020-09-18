import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import PostForm from "./components/PostForm";
import Posts from "./components/Posts";
import store from "./components/store";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <PostForm />
                <hr />
                <Posts />
            </div>
        </Provider>
    );
}

export default App;
