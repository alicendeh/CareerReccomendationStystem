const mongoose = require('mongoose');
const config = require('config');
const CR = config.get('mongoURI');

const DIP = async () => {
  try {
    await mongoose.connect(CR, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Succesfully connection to CR database');
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = DIP;
