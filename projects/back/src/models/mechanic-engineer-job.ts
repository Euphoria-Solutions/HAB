import mongoose from 'mongoose';

const { Schema } = mongoose;

const MechanicEngineerJobSchema = new Schema({
  vehicle: String,
  delivery: String,
  mechanicCheckList: String,
  prescription: String,
  confirmation: String,
  progress: String,
});

export const MechanicEngineerJobModel =
  mongoose.models.MechanicEngineerJob ||
  mongoose.model('MechanicEngineerJob', MechanicEngineerJobSchema);
