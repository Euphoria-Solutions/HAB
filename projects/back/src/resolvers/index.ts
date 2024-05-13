import { mapValues } from 'lodash';
import { login, createUser, editUser, deleteUser } from './user';
import { createPost, deletePost, editPost } from './post';
import { createVehicle, deleteVehicle, editVehicle } from './vehicle';

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

    //* Vehicle
    createVehicle,
    editVehicle,
    deleteVehicle,
  },
};

export const allResolvers = mapValues(resolversObjects, entries =>
  mapValues(entries)
);
