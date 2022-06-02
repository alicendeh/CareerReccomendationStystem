const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: 'true',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: 'true',
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },

  avater: {
    type: String,
    default: '',
  },
  cloud_id: {
    type: String,
  },
  bookmarks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'career',
    default: [],
  },

  date: {
    type: String,
    default: Date.now(),
  },
});

module.exports = mongoose.model('users', UserSchema);
