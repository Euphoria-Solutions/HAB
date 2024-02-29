import { mapValues } from 'lodash';
import { login, createUser } from './user';
import { message, postMessage } from './message';

export const resolversObjects = {
  Query: {
    helloQuery: () => 'Hello Query',
    message,
  },
  Mutation: {
    helloMutation: () => 'Hello Mutation',
    login,
    createUser,
    postMessage,
  },
};

export const allResolvers = mapValues(resolversObjects, entries =>
  mapValues(entries)
);
