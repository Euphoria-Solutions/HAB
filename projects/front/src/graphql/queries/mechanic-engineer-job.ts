import { gql } from '@apollo/client'

export const GET_MECHANIC_ENGINEER_JOB = gql`
  query Query($id: String, $username: String) {
    getMechanicEngineerJob(_id: $id, username: $username) {
      _id
      vehicle
      delivery
      mechanicCheckList
      prescription
      confirmation
    }
  }
`
