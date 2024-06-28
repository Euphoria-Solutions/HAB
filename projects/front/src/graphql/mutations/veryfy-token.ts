import { gql } from '@apollo/client'

export const VERIFY_TOKEN = gql`
  mutation Mutation($token: String) {
    verifyToken(token: $token) {
      _id
      username
    }
  }
`
