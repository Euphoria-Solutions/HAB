import {
  ResolversParentTypes,
  QueryGetMechanicalCheckListArgs,
  MutationCreateMechanicalCheckListArgs,
  MutationEditMechanicalCheckListArgs,
  MutationDeleteMechanicalCheckListArgs,
} from '@/generated/generated';
import { MechanicalCheckListModel } from '@/models';

export const createMechanicalCheckList = async (
  _: ResolversParentTypes,
  params: MutationCreateMechanicalCheckListArgs
) => {
  try {
    const checkList = new MechanicalCheckListModel(params);
    const savedCheckList = await checkList.save();
    return savedCheckList._id.toString();
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const editMechanicalCheckList = async (
  _: ResolversParentTypes,
  params: MutationEditMechanicalCheckListArgs
) => {
  try {
    await MechanicalCheckListModel.findByIdAndUpdate(params._id, params);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const deleteMechanicalCheckList = async (
  _: ResolversParentTypes,
  params: MutationDeleteMechanicalCheckListArgs
) => {
  try {
    await MechanicalCheckListModel.deleteOne(params);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const getMechanicalCheckList = async (
  _: ResolversParentTypes,
  params: QueryGetMechanicalCheckListArgs
) => {
  try {
    return await MechanicalCheckListModel.findOne(params);
  } catch (err) {
    return [];
  }
};
