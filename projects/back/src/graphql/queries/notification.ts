import { gql } from '@apollo/client';

export const notificationQuery = gql`
  type Notification {
    _id: String
    request: String
    title: String
    requestedUser: String
    change: String
    roles: [String!]
    createdAt: String
    updatedAt: String
  }

  extend type Query {
    getNotifications(_id: String, work: String, jobs: [String]): [Notification]
  }
`;
