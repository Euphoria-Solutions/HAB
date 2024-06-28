import { gql } from '@apollo/client'

export const GET_DELIVERIES = gql`
  query GetDeliveries($id: String, $contractNumber: String, $driver: String) {
    getDeliveries(_id: $id, contractNumber: $contractNumber, driver: $driver) {
      _id
      contractNumber
      containerLocation
      location
      deliveryLocation
      organization
      date
      departTime
      addedBy
      driver
      vehicle
      trailNumbers1
      trailNumbers2
    }
  }
`
