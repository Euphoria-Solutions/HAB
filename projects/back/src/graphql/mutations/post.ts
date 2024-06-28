import { gql } from '@apollo/client';

export const postMutationTypes = gql`
  extend type Mutation {
    createPost(
      username: String!
      job: String!
      photo: String
      title: String!
      date: String!
      text: String
      imageLinks: [String]
      viewer: String!
    ): Boolean!
    editPost(
      _id: String
      username: String
      job: String
      photo: String
      title: String
      date: String
      text: String
      imageLinks: [String]
      viewer: String
    ): Boolean!
    deletePost(_id: ID): Boolean!
  }
`;
