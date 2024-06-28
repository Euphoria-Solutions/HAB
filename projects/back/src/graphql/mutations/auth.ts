import { gql } from '@apollo/client';

export const authMutationTypes = gql`
  type UserDetail {
    _id: String!
    username: String!
  }

  extend type Mutation {
    login(username: String, phoneNumber: String, password: String!): String!
    verifyToken(token: String): UserDetail!
    createUser(
      username: String!
      firstname: String!
      lastname: String!
      job: String!
      phoneNumber: String!
      password: String!
    ): String!
    editUser(
      _id: String
      username: String
      firstname: String
      lastname: String
      job: String
      phoneNumber: String
      password: String
    ): Boolean!
    deleteUser(_id: String, username: String): Boolean!
    changeRequest(
      _id: String
      lastname: String!
      firstname: String!
      phoneNumber: String!
      job: String!
      reason: String!
    ): Boolean!
    changePassword(
      _id: String
      oldPassword: String
      newPassword: String
    ): Boolean!
  }
`;
