import { mapValues } from 'lodash';
import { login, createUser, editUser, deleteUser } from './user';
import { createPost, deletePost, editPost } from './post';

export const resolversObjects = {
  Query: {
    helloQuery: () => 'Hello Query',
  },
  Mutation: {
    helloMutation: () => 'Hello Mutation',
    //* Auth
    login,
    createUser,
    editUser,
    deleteUser,
    //* Post
    createPost,
    editPost,
    deletePost,
  },
};

export const allResolvers = mapValues(resolversObjects, entries =>
  mapValues(entries)
);
