const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  body: {
    type: String,
    required: 'true',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  career: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'career',
  },
  date: {
    type: String,
    default: Date.now(),
  },
});

module.exports = mongoose.model('comment', commentSchema);
