import { gql } from '@apollo/client'

export const ADD_VEHICLE = gql`
  mutation Mutation(
    $license: String!
    $manufacturedCountry: String!
    $date: String!
    $engineNumber: String!
    $ramNumber: String!
    $tonnage: String!
    $dateOfArrival: String!
    $certificate: String!
    $dateOfUse: String!
    $price: String!
    $durability: String!
    $fuel: String!
    $enginePower: String!
    $trailerNumber1: String
    $trailerNumber2: String
  ) {
    createVehicle(
      license: $license
      manufacturedCountry: $manufacturedCountry
      date: $date
      engineNumber: $engineNumber
      ramNumber: $ramNumber
      tonnage: $tonnage
      dateOfArrival: $dateOfArrival
      certificate: $certificate
      dateOfUse: $dateOfUse
      price: $price
      durability: $durability
      fuel: $fuel
      enginePower: $enginePower
      trailerNumber1: $trailerNumber1
      trailerNumber2: $trailerNumber2
    )
  }
`

export const EDIT_VEHICLE = gql`
  mutation Mutation(
    $id: String
    $license: String
    $trailerNumber1: String
    $trailerNumber2: String
    $manufacturedCountry: String
    $date: String
    $engineNumber: String
    $ramNumber: String
    $tonnage: String
    $dateOfArrival: String
    $certificate: String
    $dateOfUse: String
    $price: String
    $durability: String
    $fuel: String
    $enginePower: String
  ) {
    editVehicle(
      _id: $id
      license: $license
      trailerNumber1: $trailerNumber1
      trailerNumber2: $trailerNumber2
      manufacturedCountry: $manufacturedCountry
      date: $date
      engineNumber: $engineNumber
      ramNumber: $ramNumber
      tonnage: $tonnage
      dateOfArrival: $dateOfArrival
      certificate: $certificate
      dateOfUse: $dateOfUse
      price: $price
      durability: $durability
      fuel: $fuel
      enginePower: $enginePower
    )
  }
`

export const REMOVE_VEHICLE = gql`
  mutation Mutation($id: ID) {
    deleteVehicle(_id: $id)
  }
`
