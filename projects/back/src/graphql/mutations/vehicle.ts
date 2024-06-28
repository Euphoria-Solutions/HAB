import { gql } from '@apollo/client';

export const vehicleMutationTypes = gql`
  extend type Mutation {
    createVehicle(
      license: String!
      trailerNumber1: String
      trailerNumber2: String
      manufacturedCountry: String!
      date: String!
      engineNumber: String!
      ramNumber: String!
      tonnage: String!
      dateOfArrival: String!
      certificate: String!
      dateOfUse: String!
      price: String!
      durability: String!
      fuel: String!
      enginePower: String!
    ): Boolean!
    editVehicle(
      _id: String
      license: String
      trailerNumber1: String
      trailerNumber2: String
      manufacturedCountry: String
      date: String
      engineNumber: String
      ramNumber: String
      tonnage: String
      dateOfArrival: String
      certificate: String
      dateOfUse: String
      price: String
      durability: String
      fuel: String
      enginePower: String
    ): Boolean!
    deleteVehicle(_id: ID): Boolean!
  }
`;
