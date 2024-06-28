import mongoose from 'mongoose';

const { Schema } = mongoose;

const VehicleSchema = new Schema({
  license: String,
  trailerNumber1: String,
  trailerNumber2: String,
  manufacturedCountry: String,
  date: String,
  engineNumber: String,
  ramNumber: String,
  tonnage: String,
  dateOfArrival: String,
  certificate: String,
  dateOfUse: String,
  price: String,
  durability: String,
  fuel: String,
  enginePower: String,
});

export const VehicleModel =
  mongoose.models.Vehicle || mongoose.model('Vehicle', VehicleSchema);
