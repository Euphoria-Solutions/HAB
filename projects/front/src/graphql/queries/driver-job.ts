import { gql } from '@apollo/client'

export const GET_DRIVER_JOB = gql`
  query Query($id: String, $username: String) {
    getDriverJob(_id: $id, username: $username) {
      _id
      vehicle
      delivery
      mechanicCheckList
      prescription
      confirmation
    }
  }
`
