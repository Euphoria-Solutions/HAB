import { gql } from '@apollo/client';

export const mechanicEngineerJobMutation = gql`
  extend type Mutation {
    createMechanicEngineerJob(
      vehicle: String!
      delivery: String!
      mechanicCheckList: String!
      prescription: String!
      confirmation: String!
      progress: String
    ): Boolean!
    editMechanicEngineerJob(
      _id: String
      vehicle: String
      delivery: String
      mechanicCheckList: String
      prescription: String
      confirmation: String
      progress: String
    ): Boolean!
    deleteMechanicEngineerJob(_id: String): Boolean!
  }
`;
