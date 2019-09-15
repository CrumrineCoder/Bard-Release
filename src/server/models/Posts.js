const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostsSchema = new Schema({
  email: String,
  link: String,
  source: String, 
  name: String
});

mongoose.model('Posts', PostsSchema);