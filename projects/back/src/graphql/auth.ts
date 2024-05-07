import { gql } from '@apollo/client';

export const authTypes = gql`
  type User {
    username: String!
    firstname: String!
    lastname: String!
    phone: String!
    role: String!
    password: String!
  }

  extend type Mutation {
    login(username: String!, password: String!): String!
    createUser(
      username: String!
      firstname: String!
      lastname: String!
      password: String!
      phone: String!
      role: String!
    ): String!
    editUser(
      _id: ID
      username: String!
      firstname: String!
      lastname: String!
      phone: String!
      role: String!
    ): Boolean!
    deleteUser(_id: ID, username: String): Boolean!
  }
`;
