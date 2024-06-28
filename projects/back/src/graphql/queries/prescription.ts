import { gql } from '@apollo/client';

export const prescriptionQueryTypes = gql`
  type Presciption {
    _id: String
    intructions: [String]
    responsibilities: [String]
    additionalText: String
  }

  extend type Query {
    getPresciptions(_id: String): [Presciption]
  }
`;
