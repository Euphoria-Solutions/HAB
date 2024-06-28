import {
  MutationCreateWorkArgs,
  MutationDeleteWorkArgs,
  MutationEditWorkArgs,
  QueryGetWorksArgs,
  ResolversParentTypes,
} from '@/generated/generated';
import { WorkModel } from '@/models/work';

export const createWork = async (
  _: ResolversParentTypes,
  params: MutationCreateWorkArgs
) => {
  try {
    const mechanicEngineerJob = new WorkModel(params);

    await mechanicEngineerJob.save();

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const editWork = async (
  _: ResolversParentTypes,
  params: MutationEditWorkArgs
) => {
  try {
    await WorkModel.findByIdAndUpdate(params._id, params);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const deleteWork = async (
  _: ResolversParentTypes,
  params: MutationDeleteWorkArgs
) => {
  try {
    await WorkModel.deleteOne(params);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const getWorks = async (
  _: ResolversParentTypes,
  params: QueryGetWorksArgs
) => {
  try {
    return await WorkModel.find(params);
  } catch (err) {
    return [];
  }
};
