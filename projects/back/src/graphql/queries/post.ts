import { gql } from '@apollo/client';

export const postQueryTypes = gql`
  type Post {
    _id: String
    username: String
    job: String
    photo: String
    title: String
    date: String
    text: String
    imageLinks: [String]
    viewer: String
  }

  extend type Query {
    getPosts(_id: String, viewer: String): [Post]
  }
`;
