const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentsSchema = new Schema({
  postID: String,
  comments:[
    {
        email: String,
        text: String
    }
  ]
});

mongoose.model('Comments', CommentsSchema);