import mongoose from 'mongoose';

const { Schema } = mongoose;

const HabEngineerJobSchema = new Schema({
  vehicle: String,
  delivery: String,
  mechanicCheckList: String,
  prescription: String,
  confirmation: String,
  progress: String,
});

export const HabEngineerJobModel =
  mongoose.models.HabEngineerJob ||
  mongoose.model('HabEngineerJob', HabEngineerJobSchema);
