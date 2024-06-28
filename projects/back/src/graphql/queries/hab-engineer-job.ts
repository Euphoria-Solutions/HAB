import { gql } from '@apollo/client';

export const habEngineerJobQuery = gql`
  type habEngineerJob {
    _id: String
    vehicle: String!
    delivery: String!
    mechanicCheckList: String!
    prescription: String!
    confirmation: String!
  }

  extend type Query {
    getHabEngineerJob(_id: String, username: String): [habEngineerJob]
  }
`;
