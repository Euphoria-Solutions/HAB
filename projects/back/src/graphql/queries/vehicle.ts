import { gql } from '@apollo/client';

export const vehicleQueryTypes = gql`
  type Vehicle {
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
  }

  extend type Query {
    getVehicle(_id: String, license: String): [Vehicle]
  }
`;
