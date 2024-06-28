import { gql } from '@apollo/client'

export const CREATE_HAB_ENGINEER_JOB = gql`
  mutation Mutation(
    $vehicle: String!
    $delivery: String!
    $mechanicCheckList: String!
    $prescription: String!
    $confirmation: String!
    $progress: String
  ) {
    createHabEngineerJob(
      vehicle: $vehicle
      delivery: $delivery
      mechanicCheckList: $mechanicCheckList
      prescription: $prescription
      confirmation: $confirmation
      progress: $progress
    )
  }
`

export const EDIT_HAB_ENGINEER_JOB = gql`
  mutation Mutation(
    $id: String
    $vehicle: String
    $delivery: String
    $mechanicCheckList: String
    $prescription: String
    $confirmation: String
    $progress: String
  ) {
    editHabEngineerJob(
      _id: $id
      vehicle: $vehicle
      delivery: $delivery
      mechanicCheckList: $mechanicCheckList
      prescription: $prescription
      confirmation: $confirmation
      progress: $progress
    )
  }
`

export const DELETE_HAB_ENGINEER_JOB = gql`
  mutation Mutation($id: String) {
    deleteHabEngineerJob(_id: $id)
  }
`
