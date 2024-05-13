import {
  ResolversParentTypes,
  MutationCreateVehicleArgs,
  MutationEditVehicleArgs,
  MutationDeleteVehicleArgs,
} from '@/generated/generated';
import { VehicleModel } from '@/models';

export const createVehicle = async (
  _: ResolversParentTypes,
  params: MutationCreateVehicleArgs
) => {
  try {
    const vehicle = new VehicleModel(params);

    await vehicle.save();

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const editVehicle = async (
  _: ResolversParentTypes,
  params: MutationEditVehicleArgs
) => {
  try {
    await VehicleModel.findByIdAndUpdate(params._id, params);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const deleteVehicle = async (
  _: ResolversParentTypes,
  params: MutationDeleteVehicleArgs
) => {
  try {
    await VehicleModel.deleteOne(params);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
