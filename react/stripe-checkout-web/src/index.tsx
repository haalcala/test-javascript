import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Routes } from "./Routes";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

import { ApolloProvider } from "react-apollo";
import { createGlobalStyle } from "styled-components";

const client = new ApolloClient({
	link: ApolloLink.from([
		onError(({ graphQLErrors, networkError }) => {
			if (graphQLErrors) graphQLErrors.map(({ message, locations, path }) => console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
			if (networkError) console.log(`[Network error]: ${networkError}`);
		}),
		new HttpLink({
			uri: "http://localhost:4000/graphql",
			credentials: "include"
		})
	]),
	cache: new InMemoryCache()
});

const GlobalStyle = createGlobalStyle`
    body {
    }
    *:focus {
        outline: 0
    }
`;

ReactDOM.render(
	<ApolloProvider client={client}>
		<GlobalStyle />
		<Routes />
	</ApolloProvider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
