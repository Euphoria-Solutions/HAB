import { gql } from '@apollo/client'

export const GET_NOTIFICATION = gql`
  query Query($id: String, $work: String, $jobs: [String]) {
    getNotifications(_id: $id, work: $work, jobs: $jobs) {
      _id
      request
      title
      requestedUser
      change
      roles
      createdAt
      updatedAt
    }
  }
`
