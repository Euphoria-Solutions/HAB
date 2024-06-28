import { gql } from '@apollo/client';

export const deliveryQueryTypes = gql`
  type Delievery {
    _id: String
    contractNumber: String!
    containerLocation: String!
    location: String!
    deliveryLocation: String!
    organization: String!
    date: String!
    departTime: String!
    addedBy: String!
    driver: String!
    vehicle: String!
    trailNumbers1: String
    trailNumbers2: String
  }

  extend type Query {
    getDeliveries(
      _id: String
      contractNumber: String
      driver: String
    ): [Delievery]
  }
`;
