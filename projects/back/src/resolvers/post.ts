import {
  ResolversParentTypes,
  MutationCreatePostArgs,
  MutationEditPostArgs,
  MutationDeletePostArgs,
} from '@/generated/generated';
import { PostModel, UserModel } from '@/models';

export const createPost = async (
  _: ResolversParentTypes,
  params: MutationCreatePostArgs
) => {
  try {
    const isUserExist =
      (await UserModel.findOne({ username: params.username })) || null;

    if (!isUserExist) {
      throw new Error('NO user');
    }

    const post = new PostModel(params);

    await post.save();

    return true;
  } catch (err) {
    console.log(err);
    throw new Error((err as Error).message);
  }
};

export const editPost = async (
  _: ResolversParentTypes,
  params: MutationEditPostArgs
) => {
  try {
    const isUserExist =
      (await UserModel.findOne({ username: params.username })) || null;

    if (!isUserExist) {
      throw new Error('NO user');
    }
    await PostModel.findByIdAndUpdate(params._id, params);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const deletePost = async (
  _: ResolversParentTypes,
  params: MutationDeletePostArgs
) => {
  try {
    await PostModel.deleteOne(params);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
