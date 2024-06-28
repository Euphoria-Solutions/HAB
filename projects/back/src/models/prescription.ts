import mongoose from 'mongoose';

const { Schema } = mongoose;
const PrescriptionSchema = new Schema({
  instuction: [String],
  responsibility: [String],
  additionalText: String,
});

export const PresciptionModel =
  mongoose.models.Presciption ||
  mongoose.model('Presciption', PrescriptionSchema);
