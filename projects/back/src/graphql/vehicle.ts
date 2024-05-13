import { gql } from '@apollo/client';

export const vehicleTypes = gql`
  type Vehicle {
    _id: ID
    carNumber: String
    state: String
    progress: String
    date: String
    driver: String
    location: String
    trailerNumber: String
    trailerNumber2: String
    managerState: String
  }

  extend type Mutation {
    createVehicle(
      carNumber: String!
      state: String!
      progress: String!
      date: String!
      driver: String!
      location: String!
      trailerNumber: String
      trailerNumber2: String
      managerState: String!
    ): Boolean!
    editVehicle(
      _id: ID
      carNumber: String
      state: String
      progress: String
      date: String
      driver: String
      location: String
      trailerNumber: String
      trailerNumber2: String
      managerState: String
    ): Boolean!
    deleteVehicle(_id: ID): Boolean!
  }
`;
