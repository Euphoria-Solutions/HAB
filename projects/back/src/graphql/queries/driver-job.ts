import { gql } from '@apollo/client';

export const driverJobQuery = gql`
  type DriverJob {
    _id: String
    vehicle: String!
    delivery: String!
    mechanicCheckList: String!
    prescription: String!
    confirmation: String!
  }

  extend type Query {
    getDriverJob(_id: String, username: String): [DriverJob]
  }
`;
