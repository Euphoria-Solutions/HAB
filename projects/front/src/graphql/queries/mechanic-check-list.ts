import { gql } from '@apollo/client'

export const GET_MECHANIC_CHECK_LIST = gql`
  query Query($id: String) {
    getMechanicalCheckList(_id: $id) {
      _id
      data {
        name
        type
        state
        quality
      }
      problem {
        name
        title
        reason
        parts {
          value
          label
        }
        images
      }
      vehicle
      mechanicEngineer
    }
  }
`
