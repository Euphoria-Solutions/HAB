import jwt from 'jsonwebtoken';
import { UserModel } from '../models';
import {
  MutationCreateUserArgs,
  MutationLoginArgs,
  ResolversParentTypes,
} from '@/generated/generated';

const secretKey = 'h4b';

export const login = async (
  _: ResolversParentTypes,
  { username, password }: MutationLoginArgs
) => {
  try {
    const user = await UserModel.findOne({ name: username });
    if (user) {
      const token = jwt.verify(user.password, secretKey, {
        ignoreExpiration: true,
      });

      if (typeof token == 'string') return null;

      const sessionToken = jwt.sign(
        {
          name: user.name,
          password: user.password,
        },
        secretKey,
        { expiresIn: '7d' }
      );

      if (token.password == password) {
        return sessionToken;
      }
    }
    return null;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const createUser = async (
  _: ResolversParentTypes,
  { username, password }: MutationCreateUserArgs
) => {
  const token = jwt.sign({ password: password }, secretKey);
  try {
    const user = new UserModel({
      name: username,
      password: token,
    });

    await user.save();

    const sessionToken = jwt.sign(
      {
        name: user.name,
        password: user.password,
      },
      secretKey,
      { expiresIn: '7d' }
    );

    return sessionToken;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
