import { gql } from '@apollo/client'

export const GET_FEEDBACK = gql`
  query Query($id: String!) {
    getFeedbacks(_id: $id) {
      name
      job
      feedback
    }
  }
`
