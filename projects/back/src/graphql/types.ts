import { gql } from '@apollo/client';

export const typeDefs = gql`
  type Subscription {
  }
  type User {
    id: ID
    username: String!
    email: String!
  }

  type Message {
    id: ID
    user: User!
    content: String!
  }

  type News {
    
  }

  type Query {
    helloQuery: String
    messages: [Message!]
  }

  type Mutation {
    helloMutation: String
    login(username: String!, password: String!): String
    createUser(username: String!, password: String!): String
    postMessage(user: String!, content: String!): String
  }
`;
