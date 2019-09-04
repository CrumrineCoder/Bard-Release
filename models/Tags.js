const mongoose = require('mongoose');

const { Schema } = mongoose;

const TagsSchema = new Schema({
  postID: {
    type: String,
    required: false
  },
  tags: [
    {
      emails: {
        type: [String],
        required: false
      },
      text: {
        type: String,
        required: false
      }
    }
  ]
});

mongoose.model('Tags', TagsSchema);