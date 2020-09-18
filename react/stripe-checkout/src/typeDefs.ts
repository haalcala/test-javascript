import {gql} from 'apollo-server-express';

export const typeDefs = gql`
type User {
    id: ID!
    email: String!
    plan: String
    stripeId: String
}

type Query {
    me: User

    date: String!
}

type Mutation {
    register(email: String!, password: String!) : Boolean!

    login(email: String!, password: String!): User

    createSubscription(source: String!) : User
}
`