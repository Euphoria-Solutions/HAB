import { gql } from '@apollo/client'

export const CREATE_WORK = gql`
  mutation Mutation(
    $vehicle: String
    $delivery: String
    $progress: String
    $managerState: String
    $state: String
    $mechanicCheckList: String
    $prescription: String
    $mechanicEngineerConfirmation: String
    $habEngineerConfirmation: String
    $driverConfirmation: String
  ) {
    createWork(
      vehicle: $vehicle
      delivery: $delivery
      progress: $progress
      managerState: $managerState
      state: $state
      mechanicCheckList: $mechanicCheckList
      prescription: $prescription
      mechanicEngineerConfirmation: $mechanicEngineerConfirmation
      habEngineerConfirmation: $habEngineerConfirmation
      driverConfirmation: $driverConfirmation
    )
  }
`

export const EDIT_WORK = gql`
  mutation Mutation(
    $state: String
    $id: String
    $vehicle: String
    $delivery: String
    $mechanicCheckList: String
    $prescription: String
    $mechanicEngineerConfirmation: String
    $habEngineerConfirmation: String
    $driverConfirmation: String
    $progress: String
    $managerState: String
  ) {
    editWork(
      state: $state
      _id: $id
      vehicle: $vehicle
      delivery: $delivery
      mechanicCheckList: $mechanicCheckList
      prescription: $prescription
      mechanicEngineerConfirmation: $mechanicEngineerConfirmation
      habEngineerConfirmation: $habEngineerConfirmation
      driverConfirmation: $driverConfirmation
      progress: $progress
      managerState: $managerState
    )
  }
`

export const DELETE_WORK = gql`
  mutation Mutation($id: String) {
    deleteWork(_id: $id)
  }
`
