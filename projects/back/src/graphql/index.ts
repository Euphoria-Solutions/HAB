import { gql } from '@apollo/client';
import { authTypes } from './auth';
import { postTypes } from './post';
import { vehicleTypes } from './vehicle';

export const typeDefs = gql`
  ${authTypes}
  ${postTypes}
  ${vehicleTypes}

  type Query {
    helloQuery: String
  }

  type Mutation {
    helloMutation: String
  }
`;
