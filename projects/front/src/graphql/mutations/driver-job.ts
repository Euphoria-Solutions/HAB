import { gql } from '@apollo/client'

export const CREATE_DRIVER_JOB = gql`
  mutation Mutation(
    $vehicle: String!
    $delivery: String!
    $mechanicCheckList: String!
    $prescription: String!
    $confirmation: String!
    $progress: String
  ) {
    createDriverJob(
      vehicle: $vehicle
      delivery: $delivery
      mechanicCheckList: $mechanicCheckList
      prescription: $prescription
      confirmation: $confirmation
      progress: $progress
    )
  }
`

export const EDIT_DRIVER_JOB = gql`
  mutation Mutation(
    $id: String
    $vehicle: String
    $delivery: String
    $mechanicCheckList: String
    $prescription: String
    $confirmation: String
    $progress: String
  ) {
    editDriverJob(
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

export const DELETE_DRIVER_JOB = gql`
  mutation Mutation($id: String) {
    deleteDriverJob(_id: $id)
  }
`
