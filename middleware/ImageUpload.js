const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const config = require('config');

cloudinary.config({
  cloud_name: config.get('USER_NAME'),
  api_key: config.get('API_KEY'),
  api_secret: config.get('API_SECRET'),
});

module.exports = cloudinary;
