import mongoose from 'mongoose';

const { Schema } = mongoose;

const FeedbackSchema = new Schema({
  name: String,
  job: String,
  feedback: String,
});

export const feedbackModel =
  mongoose.models.feedback || mongoose.model('feedback', FeedbackSchema);
