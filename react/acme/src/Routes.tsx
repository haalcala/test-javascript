import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import HomeBody from "./HomeBody";
import Footer from "./Footer";
import AboutBody from "./AboutBody";
import ServicesBody from "./ServicesBody";

export default () => {
	return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route path="/" exact={true} component={HomeBody} />
				<Route path="/about" exact={true} component={AboutBody} />
				<Route path="/services" exact={true} component={ServicesBody} />
			</Switch>
			<Footer />
		</BrowserRouter>
	);
};
