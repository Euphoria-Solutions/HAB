import jwt from 'jsonwebtoken';
import {
  MutationChangePasswordArgs,
  MutationChangeRequestArgs,
  MutationCreateUserArgs,
  MutationDeleteUserArgs,
  MutationEditUserArgs,
  MutationLoginArgs,
  MutationVerifyTokenArgs,
  QueryGetUsersArgs,
  ResolversParentTypes,
} from '@/generated/generated';
import { UserModel, changeRequestModel } from '@/models';

const secretKey = 'h4b';

export const login = async (
  _: ResolversParentTypes,
  params: MutationLoginArgs
) => {
  const { username, password, phoneNumber } = params;
  try {
    const user = await UserModel.findOne({
      $or: [{ username }, { phoneNumber }],
    });
    if (!user) {
      console.log('User not found in back');
      return '';
    }

    const token = jwt.verify(user.password, secretKey, {
      ignoreExpiration: true,
    });

    if (typeof token === 'string') {
      console.log('Invalid token type');
      return null;
    }

    const sessionToken = jwt.sign(
      {
        username: username,
        _id: user._id,
      },
      secretKey,
      { expiresIn: '7d' }
    );

    if (token.password === password) {
      console.log('Password matches, returning session token');
      return sessionToken;
    } else {
      console.log('Password does not match');
    }
    return null;
  } catch (err) {
    console.error('Login error:', (err as Error).message);
    throw new Error((err as Error).message);
  }
};

export const verifyToken = async (
  _: ResolversParentTypes,
  { token }: MutationVerifyTokenArgs
) => {
  try {
    if (!token) throw new Error('invalid token');

    const userParams = jwt.verify(token, secretKey);

    return userParams;
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

    await user.save();

    const sessionToken = jwt.sign(
      {
        username: user.username,
      },
      secretKey,
      { expiresIn: '7d' }
    );

    return sessionToken;
  } catch (err) {
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

export const changeRequest = async (
  _: ResolversParentTypes,
  params: MutationChangeRequestArgs
) => {
  try {
    const changeRequest = new changeRequestModel({
      params,
    });
    await changeRequest.save();
    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const getUsers = async (
  _: ResolversParentTypes,
  params: QueryGetUsersArgs
) => {
  try {
    const users = await UserModel.find(params);
    return users;
  } catch (err) {
    return [];
  }
};

export const changePassword = async (
  _: ResolversParentTypes,
  params: MutationChangePasswordArgs
) => {
  try {
    const user = await UserModel.findById(params._id);

    const token = jwt.verify(user.password, secretKey, {
      ignoreExpiration: true,
    });

    console.log(user.password);

    if (typeof token == 'string') return false;

    if (token.password == params.oldPassword) {
      const hashedPassword = jwt.sign(
        { password: params.newPassword },
        secretKey
      );
      await UserModel.findByIdAndUpdate(params._id, {
        password: hashedPassword,
      });
      return true;
    }
    return false;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
