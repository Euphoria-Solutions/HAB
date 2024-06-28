import mongoose from 'mongoose';

const { Schema } = mongoose;

const PostSchema = new Schema({
  username: String,
  job: String,
  photo: String,
  title: String,
  date: String,
  text: String,
  imageLinks: [String],
  viewer: String,
});

export const PostModel =
  mongoose.models.Post || mongoose.model('Post', PostSchema);
