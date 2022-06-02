const express = require('express');
const router = express.Router();
const Users = require('../Models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('secret');
const Auth = require('../middleware/Auth');
const MulterUpload = require('../middleware/UserMulter');
const cloudinary = require('../middleware/ImageUpload');

//create an account
router.post('/CreateAccount', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    let user = await Users.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'Email already taken' });
    }

    user = new Users({
      name,
      email,
      password,
      role,
    });

    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    await jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
      if (err) {
        throw err;
      }
      res.status(200).json({ token });
    });
    await user.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

//login

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    await jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
      if (err) {
        throw err;
      }
      res.status(200).json({ token });
    });

    await user.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

//load user
router.get('/LoadUser', Auth, async (req, res) => {
  try {
    const user = await Users.findById(req.user.id)
      .select('-password')
      .populate('bookmarks');
    res.status(200).json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

//Update Profile
router.put(
  '/UpdateProfile',
  MulterUpload.single('image'),
  Auth,
  async (req, res) => {
    try {
      if (req.user.role === 'user' || req.user.role === 'admin') {
        let user;
        const currentUser = await Users.findById(req.user.id);
        if (currentUser.cloud_id) {
          await cloudinary.uploader.destroy(currentUser.cloud_id);
        }

        if (req.file) {
          const result = await cloudinary.uploader.upload(req.file.path);
          user = await Users.findByIdAndUpdate(
            req.user.id,
            {
              ...req.body,
              avater: result.secure_url,
              cloud_id: result.public_id,
            },
            {
              new: true,
              runValidators: true,
            }
          );
          if (!user) {
            return res.status(400).json({ message: 'No such user' });
          }
        } else {
          if (req.body.bookmarks) {
            user = await Users.findByIdAndUpdate(
              req.user.id,
              {
                bookmarks:
                  req.body.bookmarks.length > 0
                    ? [...req.body.bookmarks, ...currentUser.bookmarks]
                    : [],
                avater: currentUser.avater,
                cloud_id: currentUser.cloud_id,
              },
              {
                new: true,
                runValidators: true,
              }
            );
          } else {
            user = await Users.findByIdAndUpdate(
              req.user.id,
              {
                ...req.body,
                avater: currentUser.avater,
                cloud_id: currentUser.cloud_id,
              },
              {
                new: true,
                runValidators: true,
              }
            );
          }
        }

        return res.status(200).json({ user });
      } else {
        res.status(400).json({ message: "You don't have access to this page" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server Error' });
    }
  }
);

//delete users account
router.delete('/deleteAccount/:id', Auth, async (req, res) => {
  if (req.user.role === 'admin') {
    try {
      let user = await Users.findById(req.params.id);
      await user.remove();
      // await Class.deleteMany();

      res.status(200).json({
        message: 'user  successfully removed',
      });
    } catch (err) {
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  } else {
    res.status(400).json({ message: 'Only the admin can prform this action' });
  }
});

//view all users
router.get('/allUsers', async (req, res) => {
  try {
    const user = await Users.find({}).select('-password');
    res.status(200).json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
