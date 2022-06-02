const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async (req, res, next) => {
  let token = req.header('cr-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token,Authorization denied!!' });
  }
  try {
    let valide = await jwt.verify(token, config.get('secret'));
    req.user = valide.user;

    next();
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({
      msg: 'Invalid Token,please login with the correct role. If this is your role,please Logout and Login back',
    });
  }
};
