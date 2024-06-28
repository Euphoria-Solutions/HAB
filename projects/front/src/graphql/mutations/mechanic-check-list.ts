import { gql } from '@apollo/client'

export const ADD_MECHNIC_CHECK_LIST = gql`
  mutation Mutation(
    $data: [StatusInput]
    $problem: [ProblemInput]
    $vehicle: String
    $mechanicEngineer: String
  ) {
    createMechanicalCheckList(
      data: $data
      problem: $problem
      vehicle: $vehicle
      mechanicEngineer: $mechanicEngineer
    )
  }
`

export const EDIT_MECHANIC_CHECK_LIST = gql`
  mutation Mutation(
    $id: String
    $data: [StatusInput]
    $problem: [ProblemInput]
    $vehicle: String
    $mechanicEngineer: String
  ) {
    editMechanicalCheckList(
      _id: $id
      data: $data
      problem: $problem
      vehicle: $vehicle
      mechanicEngineer: $mechanicEngineer
    )
  }
`

export const REMOVE_VEHICLE_CHECKLIST = gql`
  mutation Mutation($id: String!) {
    deleteMechanicalCheckList(_id: $id)
  }
`
