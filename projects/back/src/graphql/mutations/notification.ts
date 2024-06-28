import { gql } from '@apollo/client';

export const notificationMutation = gql`
  extend type Mutation {
    createNotification(
      request: String!
      title: String!
      requestedUser: String!
      change: String!
      jobs: [String!]!
      isVisibleToAdmin: Boolean!
    ): Boolean!
    editNotification(
      _id: String!
      request: String
      title: String
      requestedUser: String
      change: String
      jobs: [String!]
      isVisibleToAdmin: Boolean
    ): Boolean!
    deleteNotification(_id: String): Boolean!
  }
`;
