import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation Mutation(
    $password: String!
    $phoneNumber: String
    $username: String
  ) {
    login(password: $password, phoneNumber: $phoneNumber, username: $username)
  }
`

export const ADD_USER = gql`
  mutation Mutation(
    $username: String!
    $firstname: String!
    $lastname: String!
    $job: String!
    $phoneNumber: String!
    $password: String!
  ) {
    createUser(
      username: $username
      firstname: $firstname
      lastname: $lastname
      job: $job
      phoneNumber: $phoneNumber
      password: $password
    )
  }
`

export const EDIT_USER = gql`
  mutation Mutation(
    $id: String
    $username: String
    $firstname: String
    $lastname: String
    $job: String
    $phoneNumber: String
    $password: String
  ) {
    editUser(
      _id: $id
      username: $username
      firstname: $firstname
      lastname: $lastname
      job: $job
      phoneNumber: $phoneNumber
      password: $password
    )
  }
`

export const DELETE_USER = gql`
  mutation Mutation($id: String, $username: String) {
    deleteUser(_id: $id, username: $username)
  }
`

export const CHANGE_REQUEST = gql`
  mutation Mutation(
    $lastname: String!
    $firstname: String!
    $phoneNumber: String!
    $job: String!
    $reason: String!
    $id: String
  ) {
    changeRequest(
      lastname: $lastname
      firstname: $firstname
      phoneNumber: $phoneNumber
      job: $job
      reason: $reason
      _id: $id
    )
  }
`

export const CHANGE_PASSWORD = gql`
  mutation Mutation($id: String, $oldPassword: String, $newPassword: String) {
    changePassword(
      _id: $id
      oldPassword: $oldPassword
      newPassword: $newPassword
    )
  }
`
