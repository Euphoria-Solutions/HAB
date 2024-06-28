import { gql } from '@apollo/client';

export const authQueryTypes = gql`
  type User {
    _id: String
    username: String!
    firstname: String!
    lastname: String!
    job: String!
    phoneNumber: String!
    password: String!
  }

  extend type Query {
    getUsers(_id: String, username: String, job: String): [User]
  }
`;
