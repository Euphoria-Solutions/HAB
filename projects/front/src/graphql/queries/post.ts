import { gql } from '@apollo/client'

export const GET_POSTS = gql`
  query Query($id: String, $viewer: String) {
    getPosts(_id: $id, viewer: $viewer) {
      _id
      username
      photo
      job
      date
      title
      imageLinks
      text
      viewer
    }
  }
`
