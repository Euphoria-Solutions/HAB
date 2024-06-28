import { gql } from '@apollo/client'

export const CREATE_FEEDBACK = gql`
  mutation Mutation($name: String!, $job: String!, $feedback: String!) {
    createFeedback(name: $name, job: $job, feedback: $feedback)
  }
`

export const DELETE_FEEDBACK = gql`
  mutation Mutation($id: String!) {
    deleteFeedback(_id: $id)
  }
`
