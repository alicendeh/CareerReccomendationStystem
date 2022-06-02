const mongoose = require('mongoose');

//models rename nacc

const careerSchema = mongoose.Schema({
  title: {
    type: String,
    required: 'true',
  },

  picture: {
    type: String,
    default: '',
  },
  cloud_id: {
    type: String,
  },
  domain: {
    type: String,
    required: true,
    enum: ['Science', 'Arts', 'Commercial'],
  },
  requirements: [
    {
      subject: {
        type: String,
      },
      percentage: {
        type: Number,
      },
    },
  ],
  likes: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now(),
  },
});

module.exports = mongoose.model('career', careerSchema);
