import { gql } from '@apollo/client'

export const GET_VEHICLES = gql`
  query Query($id: String, $license: String) {
    getVehicle(_id: $id, license: $license) {
      _id
      license
      trailerNumber1
      trailerNumber2
      manufacturedCountry
      date
      engineNumber
      ramNumber
      tonnage
      dateOfArrival
      certificate
      dateOfUse
      price
      durability
      fuel
      enginePower
    }
  }
`
