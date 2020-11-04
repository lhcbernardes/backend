const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  point:{
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  posts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }
});

module.exports = mongoose.model('Point', pointSchema);