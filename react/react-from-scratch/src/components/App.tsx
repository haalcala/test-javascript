import React from "react";

export interface IAppProps {}

export default function App(props: IAppProps) {
	return <h1>Hello React Typescript!!!! {new Date().toString()}</h1>;
}
