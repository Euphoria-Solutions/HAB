import { gql } from '@apollo/client'

export const CREATE_NOTIFICATION = gql`
  mutation Mutation(
    $request: String!
    $title: String!
    $requestedUser: String!
    $change: String!
    $jobs: [String!]!
    $isVisibleToAdmin: Boolean!
  ) {
    createNotification(
      request: $request
      title: $title
      requestedUser: $requestedUser
      change: $change
      jobs: $jobs
      isVisibleToAdmin: $isVisibleToAdmin
    )
  }
`

export const EDIT_NOTIFICATION = gql`
  mutation Mutation(
    $id: String!
    $request: String
    $title: String
    $requestedUser: String
    $change: String
    $jobs: [String!]
    $isVisibleToAdmin: Boolean
  ) {
    editNotification(
      _id: $id
      request: $request
      title: $title
      requestedUser: $requestedUser
      change: $change
      jobs: $jobs
      isVisibleToAdmin: $isVisibleToAdmin
    )
  }
`

export const DELETE_NOTIFICATION = gql`
  mutation Mutation($id: String) {
    deleteNotification(_id: $id)
  }
`
