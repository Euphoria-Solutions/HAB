import mongoose from 'mongoose';

const { Schema } = mongoose;

const MessageSchema = new Schema({
  user: String,
  content: String,
});

export const MessageModel =
  mongoose.models.Message || mongoose.model('Message', MessageSchema);
