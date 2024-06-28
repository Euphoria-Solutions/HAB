import { gql } from '@apollo/client';

export const deliveryMutationTypes = gql`
  extend type Mutation {
    createDelivery(
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
      trailerNumber1: String
      trailerNumber2: String
    ): Boolean!
    editDelivery(
      _id: String
      contractNumber: String
      containerLocation: String
      location: String
      deliveryLocation: String
      organization: String
      date: String
      departTime: String
      addedBy: String
      driverId: String
      vehicleId: String
      trailerNumber1: String
      trailerNumber2: String
    ): Boolean!
    deleteDelivery(_id: String): Boolean!
  }
`;
