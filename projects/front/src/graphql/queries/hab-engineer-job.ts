import { gql } from '@apollo/client'

export const GET_HAB_ENGINEER_JOB = gql`
  query Query($id: String, $username: String) {
    getHabEngineerJob(_id: $id, username: $username) {
      _id
      vehicle
      delivery
      mechanicCheckList
      prescription
      confirmation
    }
  }
`
