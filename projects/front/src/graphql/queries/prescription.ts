import { gql } from '@apollo/client'

export const GET_PRESCRIPTIONS = gql`
  query Query($id: String) {
    getPresciptions(_id: $id) {
      _id
      intructions
      responsibilities
      additionalText
    }
  }
`
