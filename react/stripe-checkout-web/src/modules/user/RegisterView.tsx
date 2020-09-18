import React, { PureComponent } from 'react'
import { Mutation } from 'react-apollo';

import {gql} from 'apollo-boost'
import { RegisterMutationVariables, RegisterMutation } from '../../schemaTypes';
import { RouteComponentProps } from 'react-router-dom';

const registerMutation = gql`
    mutation RegisterMutation($email : String!, $password : String!) {
        register(email : $email, password : $password)
    }
`

export default class RegisterView extends PureComponent<RouteComponentProps<{}>> {

    state = {
        email: "",
        password: ""
    }

    handleChange = (e : any) => {
        const {name, value} = e.target;

        this.setState({
            [name] : value
        })
    }

  render() {
      const  {email, password} = this.state

    return (
        <Mutation<RegisterMutation, RegisterMutationVariables> mutation={registerMutation}>{mutate => (
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <div>
                    <input type="text" name="email" placeholder="email" defaultValue={email} onChange={this.handleChange} />
                </div>
                <div>
                    <input type="password" name="password" placeholder="password" defaultValue={password} onChange={this.handleChange} />
                </div>
                <div>
                    <button onClick={async () => {
                            const response = await mutate({variables: {email, password}})

                            console.log(response)

                            this.props.history.push('/login')
                        }
                    }>Register</button>
                </div>
            </div>
      )}</Mutation>
    )
  }
}
