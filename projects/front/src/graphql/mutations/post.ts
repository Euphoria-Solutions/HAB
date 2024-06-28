import { gql } from '@apollo/client'

export const ADD_POST = gql`
  mutation Mutation(
    $username: String!
    $job: String!
    $title: String!
    $date: String!
    $viewer: String!
    $photo: String
    $text: String
    $imageLinks: [String]
  ) {
    createPost(
      username: $username
      job: $job
      title: $title
      date: $date
      viewer: $viewer
      photo: $photo
      text: $text
      imageLinks: $imageLinks
    )
  }
`

export const EDIT_POST = gql`
  mutation Mutation(
    $id: String
    $username: String
    $job: String
    $photo: String
    $title: String
    $date: String
    $text: String
    $imageLinks: [String]
    $viewer: String
  ) {
    editPost(
      _id: $id
      username: $username
      job: $job
      photo: $photo
      title: $title
      date: $date
      text: $text
      imageLinks: $imageLinks
      viewer: $viewer
    )
  }
`

export const REMOVE_POST = gql`
  mutation Mutation($id: ID) {
    deletePost(_id: $id)
  }
`
