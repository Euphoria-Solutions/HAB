import {
  MutationAddPrescriptionArgs,
  MutationEditPrescriptionArgs,
  MutationRemovePrescriptionArgs,
  QueryGetPresciptionsArgs,
  ResolversParentTypes,
} from '@/generated/generated';
import { PresciptionModel } from '@/models';

export const addPrescription = async (
  _: ResolversParentTypes,
  params: MutationAddPrescriptionArgs
) => {
  try {
    const prescription = new PresciptionModel(params);

    const prescriptionList = await prescription.save();

    return prescriptionList._id.toString();
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const editPrescription = async (
  _: ResolversParentTypes,
  params: MutationEditPrescriptionArgs
) => {
  try {
    await PresciptionModel.findByIdAndUpdate(params._id, params);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const removePrescription = async (
  _: ResolversParentTypes,
  params: MutationRemovePrescriptionArgs
) => {
  try {
    await PresciptionModel.deleteOne(params);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const getPresciptions = async (
  _: ResolversParentTypes,
  params: QueryGetPresciptionsArgs
) => {
  try {
    return await PresciptionModel.find(params);
  } catch (err) {
    return [];
  }
};
