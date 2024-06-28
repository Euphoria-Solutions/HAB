import {
  MutationCreateHabEngineerJobArgs,
  MutationDeleteHabEngineerJobArgs,
  MutationEditHabEngineerJobArgs,
  QueryGetHabEngineerJobArgs,
  ResolversParentTypes,
} from '@/generated/generated';
import { HabEngineerJobModel } from '@/models';

export const addHabEngineerJob = async (
  _: ResolversParentTypes,
  params: MutationCreateHabEngineerJobArgs
) => {
  try {
    const habEngineerJob = new HabEngineerJobModel(params);

    await habEngineerJob.save();

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const editHabEngineerJob = async (
  _: ResolversParentTypes,
  params: MutationEditHabEngineerJobArgs
) => {
  try {
    await HabEngineerJobModel.findByIdAndUpdate(params._id, params);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const deleteHabEngineerJob = async (
  _: ResolversParentTypes,
  params: MutationDeleteHabEngineerJobArgs
) => {
  try {
    await HabEngineerJobModel.deleteOne(params);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const getHabEngineerJob = async (
  _: ResolversParentTypes,
  params: QueryGetHabEngineerJobArgs
) => {
  try {
    return await HabEngineerJobModel.find(params);
  } catch (err) {
    return [];
  }
};
