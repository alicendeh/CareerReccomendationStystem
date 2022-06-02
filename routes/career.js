const express = require('express');
const router = express.Router();
const Users = require('../Models/User');
const Career = require('../Models/Career');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('secret');
const Auth = require('../middleware/Auth');
const MulterUpload = require('../middleware/UserMulter');
const cloudinary = require('../middleware/ImageUpload');
const Comment = require('../Models/Comments');

//create a  career option
router.post('/createCareer', async (req, res) => {
  try {
    const { title, domain, requirements, description, likes } = req.body;
    let career = new Career({
      title,
      domain,
      requirements,
      description,
      likes,
    });
    await career.save();
    res.status(200).json({ career });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

let result = [];
const fun = async (item) => {
  const cmmts = await Comment.find({
    career: item._id,
  });
  return { item: item, totalComment: cmmts.length };
};
//view all career options
router.get('/allCareers', async (req, res) => {
  try {
    // let result = [];
    const careers = await Career.find({}).sort({ date: -1 });

    const hope = Promise.all(careers.map(fun));

    hope.then((finalResult) => {
      return res.status(200).json({ finalResult });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

//delete careers
router.delete('/deleteCareer/:id', async (req, res) => {
  try {
    let career = await Career.findById(req.params.id);
    await career.remove();
    // await Class.deleteMany();

    res.status(200).json({
      message: 'career successfully removed',
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

//Update career
router.put(
  '/UpdateCareer/:id',
  MulterUpload.single('image'),
  async (req, res) => {
    let editCareer;
    try {
      let currentCareer = await Career.findById(req.params.id);
      if (currentCareer.cloud_id) {
        await cloudinary.uploader.destroy(currentCareer.cloud_id);
      }

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        editCareer = await Career.findByIdAndUpdate(
          req.params.id,
          {
            ...req.body,
            picture: result.secure_url,
            cloud_id: result.public_id,
          },
          {
            new: true,
            runValidators: true,
          }
        );
      } else {
        if (req.body.likes) {
          editCareer = await Career.findByIdAndUpdate(
            req.params.id,
            {
              likes: currentCareer.likes + 1,
              picture: currentCareer.avater,
              cloud_id: currentCareer.cloud_id,
            },
            {
              new: true,
              runValidators: true,
            }
          );
        } else {
          editCareer = await Career.findByIdAndUpdate(
            req.params.id,
            {
              ...req.body,
              picture: currentCareer.avater,
              cloud_id: currentCareer.cloud_id,
            },
            {
              new: true,
              runValidators: true,
            }
          );
        }
      }

      return res.status(200).json({ editCareer });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server Error' });
    }
  }
);

module.exports = router;
