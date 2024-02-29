import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    unique: true,
  },
  password: String,
});

export const UserModel =
  mongoose.models.User || mongoose.model('User', UserSchema);
