import { gql } from '@apollo/client';

export const feedbackQuery = gql`
  type Feedback {
    name: String!
    job: String!
    feedback: String!
  }

  extend type Query {
    getFeedbacks(_id: String!): [Feedback]!
  }
`;
