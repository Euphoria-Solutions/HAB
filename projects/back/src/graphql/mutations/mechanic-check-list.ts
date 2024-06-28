import { gql } from '@apollo/client';

export const mechanicCheckListMutationTypes = gql`
  input StatusInput {
    name: String
    type: String
    state: String
    quality: String
  }

  input PartsInput {
    value: String
    label: String
  }

  input ProblemInput {
    name: String
    title: String
    reason: String
    parts: [PartsInput]
    images: [String]
  }

  extend type Mutation {
    createMechanicalCheckList(
      data: [StatusInput]
      problem: [ProblemInput]
      vehicle: String
      mechanicEngineer: String
    ): String!
    editMechanicalCheckList(
      _id: String
      data: [StatusInput]
      problem: [ProblemInput]
      vehicle: String
      mechanicEngineer: String
    ): Boolean!
    deleteMechanicalCheckList(_id: String!): Boolean!
  }
`;
