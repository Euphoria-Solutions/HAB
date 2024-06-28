import {
  MutationCreateMechanicEngineerJobArgs,
  MutationDeleteMechanicEngineerJobArgs,
  MutationEditMechanicEngineerJobArgs,
  QueryGetMechanicEngineerJobArgs,
  ResolversParentTypes,
} from '@/generated/generated';
import { MechanicEngineerJobModel } from '@/models';

export const addMechanicEngineerJob = async (
  _: ResolversParentTypes,
  params: MutationCreateMechanicEngineerJobArgs
) => {
  try {
    const mechanicEngineerJob = new MechanicEngineerJobModel(params);

    await mechanicEngineerJob.save();

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const editMechanicEngineerJob = async (
  _: ResolversParentTypes,
  params: MutationEditMechanicEngineerJobArgs
) => {
  try {
    await MechanicEngineerJobModel.findByIdAndUpdate(params._id, params);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const deleteMechanicEngineerJob = async (
  _: ResolversParentTypes,
  params: MutationDeleteMechanicEngineerJobArgs
) => {
  try {
    await MechanicEngineerJobModel.deleteOne(params);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const getMechanicEngineerJob = async (
  _: ResolversParentTypes,
  params: QueryGetMechanicEngineerJobArgs
) => {
  try {
    return await MechanicEngineerJobModel.find(params);
  } catch (err) {
    return [];
  }
};
