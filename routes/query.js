const express = require('express');
const router = express.Router();
const Career = require('../Models/Career');
const tryQuery = require('../try');

router.post('/', async (req, res) => {
  const { data } = req.body;
  try {
    let career = await Career.find({});
    const queryResult = tryQuery(data, career);
    res.send({ l: queryResult.length, careerData: queryResult });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
    console.log(err.message);
  }
});

module.exports = router;
