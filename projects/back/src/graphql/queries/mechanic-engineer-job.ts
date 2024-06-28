import { gql } from '@apollo/client';

export const mechanicEngineerJobQuery = gql`
  type mechanicEngineerJob {
    _id: String
    vehicle: String!
    delivery: String!
    mechanicCheckList: String!
    prescription: String!
    confirmation: String!
    progress: String!
  }

  extend type Query {
    getMechanicEngineerJob(_id: String, username: String): [mechanicEngineerJob]
  }
`;
