import * as React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { SubscribeUserVariables, SubscribeUser } from '../../schemaTypes';

const subscriptionMutate = gql`
    mutation SubscribeUser($source : String!) {
        createSubscription(source : $source) {
            id
            email 
            plan
        }
    }
`

export default class SubscriptionView extends React.Component {

  render() {
    return (
      <Mutation<SubscribeUser, SubscribeUserVariables> mutation={subscriptionMutate}>{mutate => (
        <StripeCheckout
            token={async (token) => {
                console.log('token', token)

                const response = await mutate({variables: {source: token.id}})

                console.log('StripeCheckout-mutate:: response:', response)
            }}
            stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE!} 
            amount={100}
            currency="SGD"
            description="aaaa"
        />
      )}</Mutation>
    )
  }
}