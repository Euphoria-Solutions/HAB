import { mapValues } from 'lodash';
import { login, createUser, editUser, deleteUser } from './user';

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
  },
};

export const allResolvers = mapValues(resolversObjects, entries =>
  mapValues(entries)
);
