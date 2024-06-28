import mongoose from 'mongoose';

const { Schema } = mongoose;

const DelieverySchema = new Schema({
  contractNumber: String,
  containerLocation: String,
  location: String,
  deliveryLocation: String,
  organization: String,
  date: String,
  departTime: String,
  addedBy: String,
  driver: String,
  vehicle: String,
  trailNumbers1: String,
  trailNumbers2: String,
});

export const DelieveryModel =
  mongoose.models.Delievery || mongoose.model('Delievery', DelieverySchema);
