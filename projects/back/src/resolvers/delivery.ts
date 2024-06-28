import {
  ResolversParentTypes,
  MutationCreateDeliveryArgs,
  MutationEditDeliveryArgs,
  MutationDeleteDeliveryArgs,
  QueryGetDeliveriesArgs,
} from '@/generated/generated';
import { DelieveryModel } from '@/models';

export const createDelivery = async (
  _: ResolversParentTypes,
  params: MutationCreateDeliveryArgs
) => {
  try {
    const delivery = new DelieveryModel(params);

    await delivery.save();

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const editDelivery = async (
  _: ResolversParentTypes,
  params: MutationEditDeliveryArgs
) => {
  try {
    await DelieveryModel.findByIdAndUpdate(params._id, params);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const deleteDelivery = async (
  _: ResolversParentTypes,
  params: MutationDeleteDeliveryArgs
) => {
  try {
    await DelieveryModel.deleteOne(params);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const getDeliveries = async (
  _: ResolversParentTypes,
  params: QueryGetDeliveriesArgs
) => {
  try {
    return await DelieveryModel.find(params);
  } catch (err) {
    return [];
  }
};
