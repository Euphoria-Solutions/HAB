import { gql } from '@apollo/client';
import { authTypes } from './auth';
import { postTypes } from './post';

export const typeDefs = gql`
  ${authTypes}
  ${postTypes}

  type Query {
    helloQuery: String
  }

  type Mutation {
    helloMutation: String
  }
`;
