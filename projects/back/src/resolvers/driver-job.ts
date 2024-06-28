import {
  MutationCreateDriverJobArgs,
  MutationDeleteDriverJobArgs,
  MutationEditDriverJobArgs,
  QueryGetDriverJobArgs,
  ResolversParentTypes,
} from '@/generated/generated';
import { DriverJobModel } from '@/models';

export const addDriverJob = async (
  _: ResolversParentTypes,
  params: MutationCreateDriverJobArgs
) => {
  try {
    const driverJob = new DriverJobModel(params);

    await driverJob.save();

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const editDriverJob = async (
  _: ResolversParentTypes,
  params: MutationEditDriverJobArgs
) => {
  try {
    await DriverJobModel.findByIdAndUpdate(params._id, params);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const deleteDriverJob = async (
  _: ResolversParentTypes,
  params: MutationDeleteDriverJobArgs
) => {
  try {
    await DriverJobModel.deleteOne(params);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const getDriverJob = async (
  _: ResolversParentTypes,
  params: QueryGetDriverJobArgs
) => {
  try {
    return await DriverJobModel.find(params);
  } catch (err) {
    return [];
  }
};
