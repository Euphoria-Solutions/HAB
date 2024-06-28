import { gql } from '@apollo/client'

export const CREATE_DELIVERY = gql`
  mutation Mutation(
    $contractNumber: String!
    $containerLocation: String!
    $location: String!
    $deliveryLocation: String!
    $organization: String!
    $date: String!
    $departTime: String!
    $addedBy: String!
    $driver: String!
    $vehicle: String!
    $trailerNumber1: String
    $trailerNumber2: String
  ) {
    createDelivery(
      contractNumber: $contractNumber
      containerLocation: $containerLocation
      location: $location
      deliveryLocation: $deliveryLocation
      organization: $organization
      date: $date
      departTime: $departTime
      addedBy: $addedBy
      driver: $driver
      vehicle: $vehicle
      trailerNumber1: $trailerNumber1
      trailerNumber2: $trailerNumber2
    )
  }
`

export const EDIT_DELIVERY = gql`
  mutation Mutation(
    $id: String
    $contractNumber: String
    $containerLocation: String
    $location: String
    $deliveryLocation: String
    $organization: String
    $date: String
    $departTime: String
    $addedBy: String
    $driverId: String
    $vehicleId: String
    $trailerNumber1: String
    $trailerNumber2: String
  ) {
    editDelivery(
      _id: $id
      contractNumber: $contractNumber
      containerLocation: $containerLocation
      location: $location
      deliveryLocation: $deliveryLocation
      organization: $organization
      date: $date
      departTime: $departTime
      addedBy: $addedBy
      driverId: $driverId
      vehicleId: $vehicleId
      trailerNumber1: $trailerNumber1
      trailerNumber2: $trailerNumber2
    )
  }
`

export const DELETE_DELIVERY = gql`
  mutation Mutation($id: String) {
    deleteDelivery(_id: $id)
  }
`
