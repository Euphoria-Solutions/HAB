import { gql } from '@apollo/client'

export const GET_USERS = gql`
  query Query($username: String, $id: String, $job: String) {
    getUsers(username: $username, _id: $id, job: $job) {
      _id
      username
      firstname
      lastname
      job
      phoneNumber
      password
    }
  }
`
