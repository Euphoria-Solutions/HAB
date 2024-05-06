import jwt from 'jsonwebtoken';
import { UserModel } from '../models';
import {
  MutationLoginArgs,
  MutationCreateUserArgs,
  MutationEditUserArgs,
  MutationDeleteUserArgs,
  ResolversParentTypes,
} from '@/generated/generated';

const secretKey = 'h4b';

export const login = async (
  _: ResolversParentTypes,
  params: MutationLoginArgs
) => {
  try {
    const user = await UserModel.findOne({ username: params.username });
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

      if (token.password == params.password) {
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
  params: MutationCreateUserArgs
) => {
  const token = jwt.sign({ password: params.password }, secretKey);
  try {
    const user = new UserModel({
      ...params,
      password: token,
    });
    console.log(user);

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
    console.log(err);
    throw new Error((err as Error).message);
  }
};

export const editUser = async (
  _: ResolversParentTypes,
  params: MutationEditUserArgs
) => {
  try {
    await UserModel.findByIdAndUpdate(params._id, params);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const deleteUser = async (
  _: ResolversParentTypes,
  params: MutationDeleteUserArgs
) => {
  try {
    await UserModel.deleteOne(params);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
