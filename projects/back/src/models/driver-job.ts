import mongoose from 'mongoose';

const { Schema } = mongoose;

const DriverJobSchema = new Schema({
  vehicle: String,
  delivery: String,
  mechanicCheckList: String,
  prescription: String,
  confirmation: String,
  progress: String,
});

export const DriverJobModel =
  mongoose.models.DriverJob || mongoose.model('DriverJob', DriverJobSchema);
