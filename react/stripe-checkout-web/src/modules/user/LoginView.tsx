import React, { PureComponent } from "react";
import { Mutation } from "react-apollo";

import { gql } from "apollo-boost";
import { LoginMutationVariables, LoginMutation } from "../../schemaTypes";
import { RouteComponentProps } from "react-router-dom";
import { meQuery } from "../../graphql/queries/me";

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;

export default class LoginView extends PureComponent<RouteComponentProps<{}>> {
    state = {
        email: "",
        password: ""
    };

    handleChange = (e: any) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        const { email, password } = this.state;

        return (
            <Mutation<LoginMutation, LoginMutationVariables> update={(cache, { data }) => {
                if (!data || !data.login) {
                    return
                }

                cache.writeQuery({
                    query: meQuery,
                    data: { me: data.login }
                })
            }} mutation={loginMutation}>
                {(mutate, { client }) => (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                    >
                        <div>
                            <input
                                type="text"
                                name="email"
                                placeholder="email"
                                defaultValue={email}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                defaultValue={password}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <button
                                onClick={async () => {
                                    await client.resetStore()

                                    const response = await mutate({
                                        variables: { email, password }
                                    });

                                    console.log(response);

                                    if (response && (!response.data || !response.data.login)) {
                                        console.log("Incorrect user/password combination");

                                        this.props.history.push("/login");
                                    }
                                    else {
                                        this.props.history.push("/account");
                                    }
                                }}
                            >
                                Login
              </button>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}
