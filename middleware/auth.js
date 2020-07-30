/**
 * This middleware is for protecting routes from unauthorized access
 */

const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token form header with the key: x-auth-token
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // If token, verify it
  try {
    // > decode token for user info stored
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    console.log(req.user);
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
