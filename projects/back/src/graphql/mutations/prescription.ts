import { gql } from '@apollo/client';

export const prescriptionMutationTypes = gql`
  extend type Mutation {
    addPrescription(
      intructions: [String]
      responsibilities: [String]
      additionalText: String
    ): String!
    editPrescription(
      _id: String
      intructions: [String]
      responsibilities: [String]
      additionalText: String
    ): Boolean!
    removePrescription(_id: String): Boolean!
  }
`;
