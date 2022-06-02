const express = require('express');
const router = express.Router();
const Users = require('../Models/User');
const Comment = require('../Models/Comments');
const Auth = require('../middleware/Auth');

//create a  cmmt
router.post('/createComment/:cmmtID', Auth, async (req, res) => {
  try {
    const { body } = req.body;
    let cmmt = new Comment({
      body,
      user: req.user.id,
      career: req.params.cmmtID,
    });
    await cmmt.save();
    res.status(200).json({ cmmt });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

//view all cmmt per career
router.get('/allComments/:carrID', async (req, res) => {
  try {
    const cmmts = await Comment.find({
      career: req.params.carrID,
    })
      .sort({ date: -1 })
      .populate('user');
    res.status(200).json({ cmmts });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

//view all cmmt per users
router.get('/allComments/myComment/:userID', async (req, res) => {
  try {
    const cmmts = await Comment.find({
      user: req.params.userID,
    })
      .sort({ date: -1 })
      .populate('user');
    res.status(200).json({ cmmts });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

//delete comments
router.delete('/deleteComments/:id', async (req, res) => {
  try {
    let cmmt = await Comment.findById(req.params.id);
    await cmmt.remove();

    res.status(200).json({
      message: 'comment successfully removed',
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;
