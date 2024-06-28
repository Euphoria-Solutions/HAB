import {
  ResolversParentTypes,
  QueryGetNotificationsArgs,
  MutationCreateNotificationArgs,
  MutationEditNotificationArgs,
  MutationDeleteNotificationArgs,
} from '@/generated/generated';
import { NotificationModel } from '@/models';

export const createNotification = async (
  _: ResolversParentTypes,
  params: MutationCreateNotificationArgs
) => {
  try {
    const notification = new NotificationModel(params);

    await notification.save();

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const editNotification = async (
  _: ResolversParentTypes,
  params: MutationEditNotificationArgs
) => {
  try {
    await NotificationModel.findByIdAndUpdate(params._id, params);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const deleteNotification = async (
  _: ResolversParentTypes,
  params: MutationDeleteNotificationArgs
) => {
  try {
    await NotificationModel.deleteOne(params);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const getNotifications = async (
  _: ResolversParentTypes,
  params: QueryGetNotificationsArgs
) => {
  try {
    const notifications = await NotificationModel.find({
      $or: [{ roles: params.jobs }, { isVisibleToAdmin: true }],
    });
    return notifications;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};
