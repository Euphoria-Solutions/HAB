import { gql } from '@apollo/client';

export const driverJobMutation = gql`
  extend type Mutation {
    createDriverJob(
      vehicle: String!
      delivery: String!
      mechanicCheckList: String!
      prescription: String!
      confirmation: String!
      progress: String
    ): Boolean!
    editDriverJob(
      _id: String
      vehicle: String
      delivery: String
      mechanicCheckList: String
      prescription: String
      confirmation: String
      progress: String
    ): Boolean!
    deleteDriverJob(_id: String): Boolean!
  }
`;
