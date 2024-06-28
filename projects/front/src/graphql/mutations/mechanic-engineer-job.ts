import { gql } from '@apollo/client'

export const CREATE_MECHANIC_ENGINEER_JOB = gql`
  mutation Mutation(
    $vehicle: String!
    $delivery: String!
    $mechanicCheckList: String!
    $prescription: String!
    $confirmation: String!
    $progress: String
  ) {
    createMechanicEngineerJob(
      vehicle: $vehicle
      delivery: $delivery
      mechanicCheckList: $mechanicCheckList
      prescription: $prescription
      confirmation: $confirmation
      progress: $progress
    )
  }
`

export const EDIT_MECHANIC_ENGINEER_JOB = gql`
  mutation Mutation(
    $id: String
    $vehicle: String
    $delivery: String
    $mechanicCheckList: String
    $prescription: String
    $confirmation: String
    $progress: String
  ) {
    editMechanicEngineerJob(
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

export const DELETE_MECHANIC_ENGINEER_JOB = gql`
  mutation Mutation($id: String) {
    deleteMechanicEngineerJob(_id: $id)
  }
`
