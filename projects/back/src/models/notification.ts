import mongoose from 'mongoose';

const { Schema } = mongoose;

const NotificationSchema = new Schema({
  request: String,
  title: String,
  requestedUser: String,
  change: String,
  roles: {
    type: [String],
    required: true,
  },
  isVisibleToAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const NotificationModel =
  mongoose.models.Notification ||
  mongoose.model('Notification', NotificationSchema);
