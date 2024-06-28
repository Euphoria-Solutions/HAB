import { gql } from '@apollo/client';

export const mechanicCheckListQueryTypes = gql`
  type Status {
    name: String!
    type: String!
    state: String!
    quality: String
  }

  type Parts {
    value: String!
    label: String!
  }

  type Problem {
    name: String!
    title: String!
    reason: String!
    parts: [Parts]!
    images: [String]!
  }

  type MechanicalCheckList {
    _id: String!
    data: [Status]!
    problem: [Problem]!
    vehicle: String!
    mechanicEngineer: String!
  }

  extend type Query {
    getMechanicalCheckList(_id: String): MechanicalCheckList
  }
`;
