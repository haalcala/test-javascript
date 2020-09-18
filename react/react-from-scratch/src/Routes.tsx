import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./components/App";
import Header from "./Header";
import Footer from "./Footer";

export default () => {
	return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route path="/" component={App} />
			</Switch>
			<Footer />
		</BrowserRouter>
	);
};
