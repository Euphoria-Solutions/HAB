import { gql } from '@apollo/client';
import { authTypes } from './auth';

export const typeDefs = gql`
  ${authTypes}

  type Query {
    helloQuery: String
  }

  type Mutation {
    helloMutation: String
  }
`;
