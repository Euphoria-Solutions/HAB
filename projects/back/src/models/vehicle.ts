import mongoose from 'mongoose';

const { Schema } = mongoose;

const VehicleSchema = new Schema({
  carNumber: String,
  state: String,
  progress: String,
  date: String,
  driver: String,
  location: String,
  trailerNumber: String,
  trailerNumber2: String,
  managerState: String,
});

export const VehicleModel =
  mongoose.models.Vehicle || mongoose.model('Vehicle', VehicleSchema);
