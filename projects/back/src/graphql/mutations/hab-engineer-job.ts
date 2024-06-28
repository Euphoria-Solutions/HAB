import { gql } from '@apollo/client';

export const habEngineerJobMutation = gql`
  extend type Mutation {
    createHabEngineerJob(
      vehicle: String!
      delivery: String!
      mechanicCheckList: String!
      prescription: String!
      confirmation: String!
      progress: String
    ): Boolean!
    editHabEngineerJob(
      _id: String
      vehicle: String
      delivery: String
      mechanicCheckList: String
      prescription: String
      confirmation: String
      progress: String
    ): Boolean!
    deleteHabEngineerJob(_id: String): Boolean!
  }
`;
