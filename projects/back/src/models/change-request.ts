import mongoose from 'mongoose';

const { Schema } = mongoose;

const ChangeRequestSchema = new Schema({
  contractNumber: String,
  date: String!,
  trailLocation: String!,
  location: String!,
  borderLocation: String!,
  addedBy: String!,
});

export const changeRequestModel =
  mongoose.models.changeRequest ||
  mongoose.model('changeRequest', ChangeRequestSchema);
