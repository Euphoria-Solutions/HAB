import {
  MutationCreateFeedbackArgs,
  MutationDeleteFeedbackArgs,
  QueryGetFeedbacksArgs,
  ResolversParentTypes,
} from '@/generated/generated';
import { feedbackModel } from '@/models';

export const createFeedback = async (
  _: ResolversParentTypes,
  params: MutationCreateFeedbackArgs
) => {
  try {
    const feedback = new feedbackModel(params);
    await feedback.save();
    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const deleteFeedback = async (
  _: ResolversParentTypes,
  params: MutationDeleteFeedbackArgs
) => {
  try {
    await feedbackModel.deleteOne(params);
    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const getFeedbacks = async (
  _: ResolversParentTypes,
  params: QueryGetFeedbacksArgs
) => {
  try {
    const feedbacks = await feedbackModel.findOne(params);
    return feedbacks;
  } catch (err) {
    return [];
  }
};
