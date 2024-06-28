import { gql } from '@apollo/client';

export const feedbackMutation = gql`
  extend type Mutation {
    createFeedback(name: String!, job: String!, feedback: String!): Boolean!
    deleteFeedback(_id: String!): Boolean!
  }
`;
