const mongoose = require('mongoose');

const { Schema } = mongoose;

const WordsSchema = new Schema({
  _id: String,
  value:{
      documents: Array
  }
});

mongoose.model('Words', WordsSchema);