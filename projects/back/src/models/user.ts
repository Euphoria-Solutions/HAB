import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  firstname: String,
  lastname: String,
  job: String,
  phoneNumber: String,
  password: String,
});

export const UserModel =
  mongoose.models.User || mongoose.model('User', UserSchema);
