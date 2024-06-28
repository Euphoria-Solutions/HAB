import mongoose from 'mongoose';

const { Schema } = mongoose;

const WorkSchema = new Schema({
  vehicle: String,
  delivery: String,
  mechanicCheckList: String,
  prescription: String,
  mechanicEngineerConfirmation: String,
  habEngineerConfirmation: String,
  driverConfirmation: String,
  progress: String,
  managerState: String,
  state: String,
});

export const WorkModel =
  mongoose.models.Work || mongoose.model('Work', WorkSchema);
