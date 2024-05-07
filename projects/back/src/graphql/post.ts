import { gql } from '@apollo/client';

export const postTypes = gql`
  type Post {
    _id: ID
    username: String!
    photo: String!
    job: String!
    date: String!
    text: String
    imageLinks: [String]
    viewer: String!
  }

  extend type Mutation {
    createPost(
      _id: ID
      username: String!
      photo: String!
      job: String!
      date: String!
      text: String
      imageLinks: [String]
      viewer: String!
    ): Boolean!
    editPost(
      _id: ID
      username: String!
      photo: String!
      job: String!
      date: String!
      text: String
      imageLinks: [String]
      viewer: String!
    ): Boolean!
    deletePost(_id: ID!): Boolean!
  }
`;
