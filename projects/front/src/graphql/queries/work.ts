import { gql } from '@apollo/client'

export const GET_WORKS = gql`
  query Query($id: String) {
    getWorks(_id: $id) {
      _id
      vehicle
      delivery
      mechanicCheckList
      prescription
      mechanicEngineerConfirmation
      habEngineerConfirmation
      driverConfirmation
      progress
      managerState
      state
    }
  }
`
