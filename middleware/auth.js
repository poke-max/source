const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, keys.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log('get token in auth', error);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
