import { gql } from '@apollo/client'

export const ADD_PRESCRIPTION = gql`
  mutation Mutation(
    $intructions: [String]
    $responsibilities: [String]
    $additionalText: String
  ) {
    addPrescription(
      intructions: $intructions
      responsibilities: $responsibilities
      additionalText: $additionalText
    )
  }
`

export const EDIT_PRESCRIPTION = gql`
  mutation Mutation(
    $id: String
    $intructions: [String]
    $responsibilities: [String]
    $additionalText: String
  ) {
    editPrescription(
      _id: $id
      intructions: $intructions
      responsibilities: $responsibilities
      additionalText: $additionalText
    )
  }
`

export const REMOVE_PRESCRIPTION = gql`
  mutation Mutation($id: String) {
    removePrescription(_id: $id)
  }
`
